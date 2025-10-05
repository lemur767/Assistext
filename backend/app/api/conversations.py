# app/api/conversations.py
from flask import Blueprint, request, jsonify
from ..utils.auth import token_required
from .. import db
from ..models import Conversation, Contact, Message, MessageDirection, MessageStatus
from ..services.signalwire_service import signalwire_service
from datetime import datetime

conversations_bp = Blueprint('conversations_bp', __name__, strict_slashes=False)

@conversations_bp.route('/', methods=['GET'])
@token_required
def get_conversations(current_user):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    conversations_with_contacts = db.session.query(
        Conversation,
        Contact.name
    ).outerjoin(
        Contact,
        db.and_(
            Contact.phone_number == Conversation.contact_number,
            Contact.user_id == current_user.id
        )
    ).filter(Conversation.user_id == current_user.id).order_by(Conversation.last_message_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    result = []
    for conversation, contact_name in conversations_with_contacts.items:
        convo_dict = conversation.to_dict()
        convo_dict['contact_name'] = contact_name
        result.append(convo_dict)

    return jsonify({
        'conversations': result,
        'page': conversations_with_contacts.page,
        'pages': conversations_with_contacts.pages,
        'total': conversations_with_contacts.total
    })

@conversations_bp.route('/', methods=['POST'])
@token_required
def create_conversation(current_user):
    """Create a new conversation."""
    data = request.get_json()
    if not data or not 'phone_number' in data:
        return jsonify({'error': 'Missing phone_number'}), 400

    phone_number = data['phone_number']
    message_body = data.get('message')

    # Find or create conversation
    conversation = Conversation.query.filter_by(
        user_id=current_user.id,
        contact_number=phone_number
    ).first()

    if not conversation:
        conversation = Conversation(
            user_id=current_user.id,
            contact_number=phone_number,
            unread=False
        )
        db.session.add(conversation)
        db.session.flush()  # Get the conversation ID

    if message_body:
        # Save the message to the database
        new_message = Message(
            conversation_id=conversation.id,
            body=message_body,
            direction=MessageDirection.OUTBOUND,
            status=MessageStatus.DELIVERED,
            ai_generated=False,
            user_id=current_user.id,
            from_number=current_user.phone_number,
            to_number=phone_number
        )
        db.session.add(new_message)
        conversation.last_message_at = datetime.utcnow()

        # Send the message via SignalWire
        signalwire_service.send_sms(
            to_number=phone_number,
            from_number=current_user.phone_number,
            body=message_body,
            subproject_id=current_user.signalwire_subproject_id,
            auth_token=current_user.signalwire_auth_token
        )

    db.session.commit()

    return jsonify(conversation.to_dict()), 201

@conversations_bp.route('/<int:conversation_id>', methods=['GET'])
@token_required
def get_conversation(current_user, conversation_id):
    """Get a single conversation with its messages."""

    conversation_data = db.session.query(
        Conversation,
        Contact.name
    ).outerjoin(
        Contact,
        db.and_(
            Contact.phone_number == Conversation.contact_number,
            Contact.user_id == current_user.id
        )
    ).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first_or_404()

    conversation, contact_name = conversation_data
    
    # Mark conversation as read
    if conversation.unread:
        conversation.unread = False
        db.session.commit()
        
    messages = Message.query.filter_by(conversation_id=conversation.id).order_by(Message.created_at.asc()).all()
    
    convo_dict = conversation.to_dict()
    convo_dict['contact_name'] = contact_name

    return jsonify({
        'conversation': convo_dict,
        'messages': [m.to_dict() for m in messages]
    }), 200
