# app/api/conversations.py
from flask import Blueprint, request, jsonify
from ..utils.auth import token_required
from .. import db
from ..models import Conversation, Contact, Message, Message

conversations_bp = Blueprint('conversations_bp', __name__)

@conversations_bp.route('/conversations', methods=['GET'])
@token_required
def get_conversations(current_user):
    
    # Join Conversation with Contact to get the contact name
    conversations_with_contacts = db.session.query(
        Conversation,
        Contact.name
    ).outerjoin(
        Contact, 
        db.and_(
            Contact.phone_number == Conversation.contact_number,
            Contact.user_id == current_user.id
        )
    ).filter(Conversation.user_id == current_user.id).order_by(Conversation.last_message_at.desc()).all()

    result = []
    for conversation, contact_name in conversations_with_contacts:
        convo_dict = conversation.to_dict()
        convo_dict['contact_name'] = contact_name
        result.append(convo_dict)

    return jsonify(result)

@conversations_bp.route('/<int:conversation_id>', methods=['GET'])
@token_required
def get_conversation(current_user, conversation_id):
    """Get a single conversation with its messages."""
    
    conversation = Conversation.query.filter_by(id=conversation_id, user_id=current_user.id).first_or_404()
    
    # Mark conversation as read
    if conversation.unread:
        conversation.unread = False
        db.session.commit()
        
    messages = Message.query.filter_by(conversation_id=conversation.id).order_by(Message.created_at.asc()).all()
    
    return jsonify({
        'conversation': conversation.to_dict(),
        'messages': [m.to_dict() for m in messages]
    }), 200
