from flask import Blueprint, request, jsonify, Response
from werkzeug.exceptions import BadRequest, NotFound, Forbidden
from ..utils.auth import token_required
from .. import db
from ..models import User, Message, MessageDirection, Conversation, SubscriptionPlan, PhoneNumberStatus
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
    if not current_user:
        raise NotFound('User not found')
    return jsonify({'user': current_user.to_dict()})

@users_bp.route('/profile/keyword_triggers', methods=['PUT'])
@token_required
def update_keyword_triggers(current_user):
    if not current_user:
        raise NotFound('User not found')
    data = request.get_json()
    if not data or 'keyword_triggers' not in data:
        raise BadRequest('Missing keyword_triggers')
    if not isinstance(data['keyword_triggers'], list) or not all(isinstance(k, str) for k in data['keyword_triggers']):
        raise BadRequest('keyword_triggers must be a list of strings')
    
    current_user.keyword_triggers = data['keyword_triggers']
    db.session.commit()
    return jsonify({'message': 'Keyword triggers updated successfully'})

@users_bp.route('/profile/ai-settings', methods=['PUT'])
@token_required
def update_ai_settings(current_user):
    if not current_user:
        raise NotFound('User not found')
    if current_user.subscription_plan != SubscriptionPlan.PRO:
        raise Forbidden('This feature is only available for Pro subscribers')
    data = request.get_json()
    if not data:
        raise BadRequest('Missing data')

    if 'ai_system_prompt' in data:
        if not isinstance(data['ai_system_prompt'], str):
            raise BadRequest('ai_system_prompt must be a string')
        current_user.ai_system_prompt = data['ai_system_prompt']
    if 'ai_tone' in data:
        if not isinstance(data['ai_tone'], str):
            raise BadRequest('ai_tone must be a string')
        current_user.ai_tone = data['ai_tone']
    if 'include_ai_signature' in data:
        if not isinstance(data['include_ai_signature'], bool):
            raise BadRequest('include_ai_signature must be a boolean')
        current_user.include_ai_signature = data['include_ai_signature']

    db.session.commit()
    return jsonify({'message': 'AI settings updated successfully'})

@users_bp.route('/profile/include_ai_signature', methods=['PUT'])
@token_required
def update_include_ai_signature(current_user):
    if not current_user:
        raise NotFound('User not found')
    data = request.get_json()
    if not data or 'include_ai_signature' not in data:
        raise BadRequest('Missing include_ai_signature')
    if not isinstance(data['include_ai_signature'], bool):
        raise BadRequest('include_ai_signature must be a boolean')

    current_user.include_ai_signature = data['include_ai_signature']
    db.session.commit()
    return jsonify({'message': 'AI signature preference updated successfully'})

@users_bp.route('/messages', methods=['GET'])
@token_required
def get_messages(current_user):
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    messages_query = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id).order_by(Message.created_at.desc())
    messages_pagination = messages_query.paginate(page=page, per_page=per_page, error_out=False)
    
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
    })

@users_bp.route('/me/recent_messages', methods=['GET'])
@token_required
def get_recent_messages(current_user):
    if not current_user:
        raise NotFound('User not found')
    messages = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id).order_by(Message.created_at.desc()).limit(5).all()
    return jsonify({'messages': [msg.to_dict() for msg in messages]})

@users_bp.route('/export/preview', methods=['GET'])
@token_required
def export_preview(current_user):
    if not current_user:
        raise NotFound('User not found')
    total_messages = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id).count()
    inbound_messages = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id, Message.direction == MessageDirection.INBOUND).count()
    outbound_messages = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id, Message.direction == MessageDirection.OUTBOUND).count()
    
    summary = {
        'total_records': 1 + total_messages,
        'user_account': 1,
        'total_messages': total_messages,
        'inbound_messages': inbound_messages,
        'outbound_messages': outbound_messages,
        'trial_status': current_user.trial_status.value,
        'account_created': current_user.created_at.isoformat(),
        'phone_number': current_user.phone_number
    }
    return jsonify({'summary': summary})

@users_bp.route('/export/json', methods=['GET'])
@token_required
def export_json(current_user):
    messages = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id).order_by(Message.created_at.desc()).all()
    export_data = {
        'user_account': current_user.to_dict(include_sensitive=True),
        'messages': [msg.to_dict() for msg in messages],
        'export_metadata': {
            'exported_at': datetime.utcnow().isoformat(),
            'export_version': '1.0',
            'total_records': 1 + len(messages)
        }
    }
    filename = f"user-data-export-{current_user.id}-{datetime.utcnow().strftime('%Y-%m-%d')}.json"
    response = Response(json.dumps(export_data, indent=2), mimetype='application/json')
    response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

@users_bp.route('/export/csv', methods=['GET'])
@token_required
def export_csv(current_user):
    if not current_user:
        raise NotFound('User not found')
    messages = db.session.query(Message).join(Conversation).filter(Conversation.user_id == current_user.id).order_by(Message.created_at.desc()).all()
    output = io.StringIO()
    output.write('USER ACCOUNT DATA\n')
    output.write('Field,Value\n')
    user_data = current_user.to_dict(include_sensitive=False)
    for key, value in user_data.items():
        output.write(f'"{key}","{value}"\n')
    output.write('\nMESSAGES\n')
    if messages:
        fieldnames = ['id', 'message_sid', 'from_number', 'to_number', 'body', 'direction', 'status', 'ai_generated', 'created_at']
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        for msg in messages:
            msg_dict = msg.to_dict()
            writer.writerow({k: msg_dict.get(k, '') for k in fieldnames})
    filename = f"user-data-export-{current_user.id}-{datetime.utcnow().strftime('%Y-%m-%d')}.csv"
    response = Response(output.getvalue(), mimetype='text/csv')
    response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

@users_bp.route('/delete', methods=['DELETE'])
@token_required
def delete_account(current_user):
    if not current_user:
        raise NotFound('User not found')
    try:
        if current_user.phone_number_sid and current_user.signalwire_subproject_id:
            signalwire_service.release_phone_number(current_user.phone_number_sid, current_user.signalwire_subproject_id)
        if current_user.signalwire_subproject_id:
            signalwire_service.delete_subproject(current_user.signalwire_subproject_id)
    except Exception as e:
        logger.warning(f"Failed to cleanup SignalWire resources for user {current_user.id}: {e}")
    
    db.session.delete(current_user)
    db.session.commit()
    logger.info(f"User account deleted: {current_user.email}")
    return jsonify({'message': 'Account deleted successfully'})

@users_bp.route('/purchase-number', methods=['POST'])
@token_required
def purchase_number(current_user):
    if not current_user:
        raise NotFound('User not found')
    
    if current_user.phone_number:
        raise BadRequest('User already has a phone number')

    try:
        # Create subproject if it doesn't exist
        if not current_user.signalwire_subproject_id:
            friendly_name = signalwire_service.generate_friendly_name(current_user.email)
            subproject = signalwire_service.create_subproject(friendly_name)
            current_user.signalwire_subproject_id = subproject.sid
            current_user.signalwire_auth_token = subproject.auth_token
            current_user.signalwire_signing_key = subproject.signing_key
            current_user.signalwire_friendly_name = subproject.friendly_name
            db.session.flush() # Ensure ID is available if needed, though we have it

        # Search and purchase number
        # Use user's location info if available, otherwise defaults might apply or we can't search specific
        # Assuming user has country_code, city, state from registration
        available_numbers = signalwire_service.search_available_numbers(
            current_user.country_code, 
            limit=5, 
            city=current_user.city, 
            region=current_user.state
        )
        
        if not available_numbers:
            raise BadRequest(f"No phone numbers available for country: {current_user.country_code}")

        selected_number = available_numbers[0]
        webhook_url = signalwire_service.generate_webhook_url(current_user.id)
        purchased_number = signalwire_service.purchase_phone_number(
            selected_number.phone_number, 
            current_user.signalwire_subproject_id, 
            current_user.signalwire_auth_token,
            webhook_url
        )

        current_user.phone_number = purchased_number.phone_number
        current_user.phone_number_sid = purchased_number.sid
        current_user.webhook_url = webhook_url
        current_user.phone_number_status = PhoneNumberStatus.ACTIVE
        
        db.session.commit()
        
        logger.info(f"Purchased phone number for {current_user.email}: {purchased_number.phone_number}")
        
        return jsonify({
            'message': 'Phone number purchased successfully',
            'phone_number': current_user.phone_number,
            'user': current_user.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to purchase number for {current_user.email}: {e}")
        # If it was a signalwire error, we might want to return a specific error message
        raise BadRequest(f"Failed to purchase number: {str(e)}")
