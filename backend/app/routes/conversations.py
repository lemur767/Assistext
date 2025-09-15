# app/routes/conversations.py
from flask import Blueprint, request, jsonify
import logging

from ..models.conversation import Conversation
from ..models.message import Message
from ..utils.auth import token_required
from .. import db

logger = logging.getLogger(__name__)

# Create blueprint
conversations_bp = Blueprint('conversations', __name__, url_prefix='/api/v1')

@conversations_bp.route('/conversations', methods=['GET'])
@token_required
def get_conversations(current_user):
    try:
        page = request.args.get('page', 1, type=int)
        per_page = 20
        
        conversations = Conversation.query.filter_by(user_id=current_user.id)\
            .order_by(Conversation.last_message_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        # Format conversations for frontend
        conversation_list = []
        for conv in conversations.items:
            # Get the latest message for preview
            latest_message = Message.query.filter_by(user_id=current_user.id)\
                .order_by(Message.created_at.desc()).first()
            
            conversation_list.append({
                'id': conv.id,
                'contact_number': 'Unknown',  # You'd derive this from messages
                'last_message': latest_message.body if latest_message else 'No messages',
                'last_message_at': conv.last_message_at.isoformat(),
                'unread': conv.unread
            })
        
        return jsonify({
            'conversations': conversation_list,
            'pages': conversations.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get conversations: {e}")
        return jsonify({'error': 'Failed to retrieve conversations'}), 500

@conversations_bp.route('/conversations/<int:conversation_id>', methods=['GET'])
@token_required
def get_conversation_detail(current_user, conversation_id):
    try:
        # Get conversation
        conversation = Conversation.query.filter_by(
            id=conversation_id, 
            user_id=current_user.id
        ).first()
        
        if not conversation:
            return jsonify({'error': 'Conversation not found'}), 404
        
        # Get messages for this conversation
        messages = Message.query.filter_by(user_id=current_user.id)\
            .order_by(Message.created_at.asc()).all()
        
        # Format messages for frontend
        message_list = []
        for msg in messages:
            message_list.append({
                'id': msg.id,
                'sender': 'ai' if msg.ai_generated else 'contact',
                'content': msg.body,
                'created_at': msg.created_at.isoformat()
            })
        
        return jsonify({
            'conversation': conversation.to_dict(),
            'messages': message_list
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get conversation detail: {e}")
        return jsonify({'error': 'Failed to retrieve conversation'}), 500