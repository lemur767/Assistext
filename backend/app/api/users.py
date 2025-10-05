# app/api/users.py
from flask import Blueprint, request, jsonify, Response
from ..utils.auth import token_required
from .. import db
from ..models import User, Message, MessageDirection
from datetime import datetime
from ..services.signalwire_service import signalwire_service
import json
import csv
import io
import logging

logger = logging.getLogger(__name__)

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    """Get user profile"""
    try:
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': current_user.to_dict()}), 200
        
    except Exception as e:
        logger.error(f"Get profile error: {str(e)}")
        return jsonify({'error': 'Failed to get profile'}), 500

@users_bp.route('/messages', methods=['GET'])
@token_required
def get_messages(current_user):
    """Get user messages with pagination"""
    try:
        # Pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 20, type=int), 100)
        
        # Query messages
        messages_query = Message.query.filter_by(user_id=current_user.id).order_by(Message.created_at.desc())
        messages_pagination = messages_query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'messages': [msg.to_dict() for msg in messages_pagination.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': messages_pagination.total,
                'pages': messages_pagination.pages,
                'has_next': messages_pagination.has_next,
                'has_prev': messages_pagination.has_prev
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Get messages error: {str(e)}")
        return jsonify({'error': 'Failed to get messages'}), 500

@users_bp.route('/export/preview', methods=['GET'])
@token_required
def export_preview(current_user):
    """Get export preview summary"""
    try:
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get message counts
        total_messages = Message.query.filter_by(user_id=current_user.id).count()
        inbound_messages = Message.query.filter_by(
            user_id=current_user.id, 
            direction=MessageDirection.INBOUND
        ).count()
        outbound_messages = Message.query.filter_by(
            user_id=current_user.id, 
            direction=MessageDirection.OUTBOUND
        ).count()
        
        summary = {
            'total_records': 1 + total_messages,  # 1 user + messages
            'user_account': 1,
            'total_messages': total_messages,
            'inbound_messages': inbound_messages,
            'outbound_messages': outbound_messages,
            'trial_status': current_user.trial_status.value,
            'account_created': current_user.created_at.isoformat(),
            'phone_number': current_user.phone_number
        }
        
        return jsonify({'summary': summary}), 200
        
    except Exception as e:
        logger.error(f"Export preview error: {str(e)}")
        return jsonify({'error': 'Failed to generate export preview'}), 500

@users_bp.route('/export/json', methods=['GET'])
@token_required
def export_json(current_user):
    """Export user data as JSON"""
    try:
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get all messages
        messages = Message.query.filter_by(user_id=current_user.id).order_by(Message.created_at.desc()).all()
        
        # Prepare export data
        export_data = {
            'user_account': current_user.to_dict(include_sensitive=True),
            'messages': [msg.to_dict() for msg in messages],
            'export_metadata': {
                'exported_at': datetime.utcnow().isoformat(),
                'export_version': '1.0',
                'total_records': 1 + len(messages)
            }
        }
        
        # Create response
        filename = f"user-data-export-{current_user.id}-{datetime.utcnow().strftime('%Y-%m-%d')}.json"
        
        response = Response(
            json.dumps(export_data, indent=2),
            mimetype='application/json'
        )
        response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        return response
        
    except Exception as e:
        logger.error(f"JSON export error: {str(e)}")
        return jsonify({'error': 'Failed to export data as JSON'}), 500

@users_bp.route('/export/csv', methods=['GET'])
@token_required
def export_csv(current_user):
    """Export user data as CSV"""
    try:
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get all messages
        messages = Message.query.filter_by(user_id=current_user.id).order_by(Message.created_at.desc()).all()
        
        # Create CSV
        output = io.StringIO()
        
        # User Account Section
        output.write('USER ACCOUNT DATA\n')
        output.write('Field,Value\n')
        user_data = current_user.to_dict(include_sensitive=False)
        for key, value in user_data.items():
            output.write(f'"{key}","{value}"\n')
        
        # Messages Section
        output.write('\nMESSAGES\n')
        if messages:
            fieldnames = ['id', 'message_sid', 'from_number', 'to_number', 'body', 
                         'direction', 'status', 'ai_generated', 'created_at']
            writer = csv.DictWriter(output, fieldnames=fieldnames)
            writer.writeheader()
            
            for msg in messages:
                msg_dict = msg.to_dict()
                writer.writerow({k: msg_dict.get(k, '') for k in fieldnames})
        
        # Create response
        filename = f"user-data-export-{current_user.id}-{datetime.utcnow().strftime('%Y-%m-%d')}.csv"
        
        response = Response(
            output.getvalue(),
            mimetype='text/csv'
        )
        response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        return response
        
    except Exception as e:
        logger.error(f"CSV export error: {str(e)}")
        return jsonify({'error': 'Failed to export data as CSV'}), 500

@users_bp.route('/delete', methods=['DELETE'])
@token_required
def delete_account(current_user):
    """Delete user account and all associated data"""
    try:
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        # Clean up SignalWire resources
        try:
            if current_user.phone_number_sid and current_user.signalwire_subproject_id:
                signalwire_service.release_phone_number(
                    current_user.phone_number_sid, 
                    current_user.signalwire_subproject_id
                )
            
            if current_user.signalwire_subproject_id:
                signalwire_service.delete_subproject(current_user.signalwire_subproject_id)
                
        except Exception as e:
            logger.warning(f"Failed to cleanup SignalWire resources for user {current_user.id}: {e}")
            # Continue with account deletion even if SignalWire cleanup fails
        
        # Delete user (cascade will delete messages)
        db.session.delete(current_user)
        db.session.commit()
        
        logger.info(f"User account deleted: {current_user.email}")
        
        return jsonify({'message': 'Account deleted successfully'}), 200
        
    except Exception as e:
        logger.error(f"Delete account error: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to delete account'}), 500