# backend/app/api/chat.py
from flask import Blueprint
from .. import db, socketio
from ..models import Conversation, Message, User, MessageDirection, MessageStatus
from ..services.signalwire_service import signalwire_service
from flask_socketio import emit, join_room, leave_room
import logging
from datetime import datetime

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
    logger.info(f"Received send_message event for conversation {conversation_id}")
    room = f"conversation_{conversation_id}"
    conversation = Conversation.query.get(conversation_id)

    if conversation:
        try:
            logger.info("Found conversation, retrieving user...")
            user = User.query.get(conversation.user_id)
            if not user:
                logger.error("User not found for conversation")
                return {'status': 'error', 'msg': 'User not found.'}

            logger.info("User found, creating message...")
            new_message = Message(
                conversation_id=conversation.id,
                user_id=conversation.user_id,
                body=message['body'],
                direction=MessageDirection.OUTBOUND,
                status=MessageStatus.DELIVERED,
                ai_generated=False,
                from_number=user.phone_number,
                to_number=conversation.contact.phone_number
            )
            
            logger.info("Adding message to session...")
            db.session.add(new_message)
            conversation.last_message_at = datetime.utcnow()
            
            logger.info("Committing message to database...")
            db.session.commit()
            logger.info("Message committed to database.")

            logger.info("Sending SMS via SignalWire...")
            signalwire_service.send_sms(
                to_number=conversation.contact.phone_number,
                from_number=user.phone_number,
                body=message['body'],
                subproject_id=user.signalwire_subproject_id,
                auth_token=user.signalwire_auth_token
            )
            logger.info("SMS sent successfully.")

            logger.info("Broadcasting new message to room...")
            emit('new_message', new_message.to_dict(), room=room, include_self=False)
            logger.info(f"Message sent by user {conversation.user_id} in conversation {conversation.id}")

            return {'status': 'ok', 'message': new_message.to_dict()}

        except Exception as e:
            logger.error(f"Error sending message in conversation {conversation.id}: {e}")
            db.session.rollback()
            return {'status': 'error', 'msg': 'Failed to send message.'}
    else:
        logger.error(f"Conversation {conversation_id} not found.")
        return {'status': 'error', 'msg': 'Conversation not found.'}


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
