# backend/app/api/chat.py
from flask import Blueprint
from .. import db, socketio
from ..models import Conversation, Message, User, MessageDirection, MessageStatus
from ..services.signalwire_service import signalwire_service
from flask_socketio import emit, join_room, leave_room
import logging

logger = logging.getLogger(__name__)
chat_bp = Blueprint('chat', __name__)

@socketio.on('join', namespace='/chat')
def join(message):
    room = f"conversation_{message['conversation_id']}"
    join_room(room)
    emit('status', {'msg': f"Joined room: {room}"}, room=room)

@socketio.on('leave', namespace='/chat')
def leave(message):
    room = f"conversation_{message['conversation_id']}"
    leave_room(room)
    emit('status', {'msg': f"Left room: {room}"}, room=room)

@socketio.on('send_message', namespace='/chat')
def send_message(message):
    conversation_id = message['conversation_id']
    room = f"conversation_{conversation_id}"
    conversation = Conversation.query.get(conversation_id)

    if conversation:
        try:
            user = User.query.get(conversation.user_id)
            if not user:
                emit('error', {'msg': 'User not found.'})
                return

            # Save the message to the database
            new_message = Message(
                conversation_id=conversation.id,
                body=message['body'],
                direction=MessageDirection.OUTBOUND,
                status=MessageStatus.DELIVERED,
                ai_generated=False,
                user_id=conversation.user_id,
                from_number=user.phone_number,
                to_number=conversation.contact_number
            )
            db.session.add(new_message)
            db.session.commit()

            # Send the message via SignalWire
            signalwire_service.send_sms(
                to_number=conversation.contact_number,
                from_number=user.phone_number,
                body=message['body'],
                subproject_id=user.signalwire_subproject_id,
                auth_token=user.signalwire_auth_token
            )

            # Broadcast the new message to the room
            emit('new_message', new_message.to_dict(), room=room)
            logger.info(f"Message sent by user {conversation.user_id} in conversation {conversation.id}")

        except Exception as e:
            logger.error(f"Error sending message in conversation {conversation.id}: {e}")
            emit('error', {'msg': 'Failed to send message.'}, room=room)
    else:
        logger.error(f"Conversation {conversation_id} not found.")
        emit('error', {'msg': 'Conversation not found.'})


@socketio.on('takeover_conversation', namespace='/chat')
def takeover_conversation(message):
    conversation_id = message['conversation_id']
    room = f"conversation_{conversation_id}"
    conversation = Conversation.query.get(conversation_id)

    if conversation:
        try:
            conversation.controlled_by = 'user'
            db.session.commit()
            emit('status', {'msg': 'Conversation taken over by user.'}, room=room)
            logger.info(f"Conversation {conversation.id} taken over by user {conversation.user_id}")
        except Exception as e:
            logger.error(f"Error taking over conversation {conversation.id}: {e}")
            emit('error', {'msg': 'Failed to take over conversation.'}, room=room)
    else:
        logger.error(f"Conversation {conversation_id} not found.")
        emit('error', {'msg': 'Conversation not found.'})
