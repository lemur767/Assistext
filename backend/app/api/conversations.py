# app/api/conversations.py
from flask import Blueprint, request, jsonify
from ..utils.auth import token_required
from .. import db
from ..models import Conversation, Contact, Message, MessageDirection, MessageStatus
from ..services.signalwire_service import signalwire_service
from datetime import datetime

conversations_bp = Blueprint('conversations_bp', __name__)

from sqlalchemy import func

@conversations_bp.route('/', methods=['GET'])
@token_required
def get_conversations(current_user):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Subquery to rank messages within each conversation
    ranked_messages_subquery = db.session.query(
        Message.id,
        Message.body,
        Message.sentiment,
        Message.conversation_id,
        func.row_number().over(
            partition_by=Message.conversation_id,
            order_by=Message.created_at.desc()
        ).label('rn')
    ).filter(Message.user_id == current_user.id).subquery()

    # Main query to get conversations and join with the last message
    conversations_with_last_message = db.session.query(
        Conversation,
        Contact.name,
        ranked_messages_subquery.c.body,
        ranked_messages_subquery.c.sentiment
    ).outerjoin(
        Contact,
        db.and_(
            Contact.id == Conversation.contact_id,
            Contact.user_id == current_user.id
        )
    ).outerjoin(
        ranked_messages_subquery,
        db.and_(
            Conversation.id == ranked_messages_subquery.c.conversation_id,
            ranked_messages_subquery.c.rn == 1
        )
    ).filter(Conversation.user_id == current_user.id).order_by(Conversation.last_message_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    result = []
    for conversation, contact_name, last_message_body, last_message_sentiment in conversations_with_last_message.items:
        convo_dict = conversation.to_dict()
        convo_dict['contact_name'] = contact_name
        convo_dict['last_message'] = last_message_body or ""
        convo_dict['last_message_sentiment'] = last_message_sentiment
        result.append(convo_dict)

    return jsonify({
        'conversations': result,
        'page': conversations_with_last_message.page,
        'pages': conversations_with_last_message.pages,
        'total': conversations_with_last_message.total
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
    contact_name = data.get('name')

    # Find or create contact
    contact = Contact.query.filter_by(
        user_id=current_user.id,
        phone_number=phone_number
    ).first()

    if not contact:
        contact = Contact(
            user_id=current_user.id,
            phone_number=phone_number,
            name=contact_name or phone_number
        )
        db.session.add(contact)
        db.session.flush() # Get the contact ID

    # Find or create conversation
    conversation = Conversation.query.filter_by(
        user_id=current_user.id,
        contact_id=contact.id
    ).first()

    if not conversation:
        conversation = Conversation(
            user_id=current_user.id,
            contact_id=contact.id,
            unread=False
        )
        db.session.add(conversation)
        db.session.flush()  # Get the conversation ID

    if message_body:
        # Save the message to the database
        new_message = Message(
            conversation_id=conversation.id,
            user_id=current_user.id,
            body=message_body,
            direction=MessageDirection.OUTBOUND,
            status=MessageStatus.DELIVERED,
            ai_generated=False,
            from_number=current_user.phone_number,
            to_number=contact.phone_number
        )
        db.session.add(new_message)
        conversation.last_message_at = datetime.utcnow()

        # Send the message via SignalWire
        signalwire_service.send_sms(
            to_number=contact.phone_number,
            from_number=current_user.phone_number,
            body=message_body,
            subproject_id=current_user.signalwire_subproject_id,
            auth_token=current_user.signalwire_auth_token
        )

    db.session.commit()

    # Notify user room for conversation list update
    user_room = f"user_{current_user.id}"
    socketio.emit('conversation_created', conversation.to_dict(), room=user_room, namespace='/chat')

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
            Contact.id == Conversation.contact_id,
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
