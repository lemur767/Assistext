# app/api/webhooks.py - Updated handle_sms_webhook function
from flask import Blueprint, request, Response, jsonify
from .. import db, socketio
from ..models import User, Message, Conversation, MessageDirection, MessageStatus
from ..services import ai_service, signalwire_service
from ..utils.security import verify_signalwire_signature
import logging
import time
from datetime import datetime

logger = logging.getLogger(__name__)

webhooks_bp = Blueprint('webhooks', __name__)

@webhooks_bp.route('/sms/<int:user_id>', methods=['POST'])
def handle_sms_webhook(user_id):
    """Handle incoming SMS webhook from SignalWire"""
    start_time = time.time()
    
    try:
        logger.info(f"Request Content-Type: {request.content_type}")
        logger.info(f"Type of request.form: {type(request.form)}")
        # 1. Verify user exists and is active
        user = User.query.get(user_id)
        if not user:
            logger.error(f"User {user_id} not found")
            return Response(status=404)

        # 2. Verify SignalWire signature
        url = request.url
        if 'ngrok' in url:
            url = url.replace('http://', 'https://')
            
        if not verify_signalwire_signature(user.signalwire_signing_key, url, request.form):
            logger.warning(f"Invalid SignalWire signature for user {user_id}")
            return Response(status=403)

        # Get webhook data
        webhook_data = request.form.to_dict()
        
        message_sid = webhook_data.get('MessageSid')
        from_number = webhook_data.get('From')
        to_number = webhook_data.get('To')
        body = webhook_data.get('Body', '')
        num_media = int(webhook_data.get('NumMedia', 0))
        
        logger.info(f"SMS webhook received for user {user_id}: {from_number} -> {to_number}: {body}")
        
        # 3. Check if trial is active
        if not user.is_trial_active and user.trial_status.value != 'upgraded':
            logger.warning(f"Trial expired for user {user_id}")
            signalwire_service.send_sms(
                to_number=from_number,
                from_number=to_number,
                body="Your trial has expired. Please subscribe to continue using this service.",
                subproject_id=user.signalwire_subproject_id,
                auth_token=user.signalwire_auth_token
            )
            return Response(status=200)
        
        # 4. Find or create conversation
        conversation = Conversation.query.filter_by(
            user_id=user_id,
            contact_number=from_number
        ).first()
        
        if not conversation:
            conversation = Conversation(
                user_id=user_id,
                contact_number=from_number,
                unread=True
            )
            db.session.add(conversation)
            db.session.flush()  # Get the conversation ID
        
        # Update conversation
        conversation.last_message_at = datetime.utcnow()
        conversation.unread = True
        
        # 5. Store incoming message
        try:
            incoming_message = Message(
                user_id=user_id,
                conversation_id=conversation.id,  # Link to conversation
                message_sid=message_sid,
                from_number=from_number,
                to_number=to_number,
                body=body,
                direction=MessageDirection.INBOUND,
                status=MessageStatus.RECEIVED,
                num_media=num_media
            )
            
            db.session.add(incoming_message)
            db.session.commit()

            # Notify frontend of new message
            room = f"conversation_{conversation.id}"
            socketio.emit('new_message', incoming_message.to_dict(), room=room, namespace='/chat')
            
        except Exception as e:
            logger.error(f"Failed to store incoming message: {e}")
            # Continue processing even if storage fails
        
        # 6. Generate AI response
        try:
            ai_response = ai_service.generate_response(body, user.email, conversation)
            if ai_response is None:
                logger.info(f"AI response skipped for user {user_id} in conversation {conversation.id} (user controlled)")
                return Response(status=200)

        except Exception as e:
            logger.error(f"AI response generation failed: {e}")
            ai_response = "Thanks for your message! I received it and will get back to you soon."
        
        # 7. Store outbound message
        processing_time = int((time.time() - start_time) * 1000)
        
        try:
            outbound_message = Message(
                user_id=user_id,
                conversation_id=conversation.id,  # Link to conversation
                from_number=to_number,
                to_number=from_number,
                body=ai_response,
                direction=MessageDirection.OUTBOUND,
                status=MessageStatus.DELIVERED,
                ai_generated=True,
                processing_time_ms=processing_time
            )
            
            db.session.add(outbound_message)
            db.session.commit()
            
        except Exception as e:
            logger.error(f"Failed to store outbound message: {e}")
            # Continue processing even if storage fails
        
        # 8. Send SMS response
        try:
            signalwire_service.send_sms(
                to_number=from_number,
                from_number=to_number,
                body=ai_response,
                subproject_id=user.signalwire_subproject_id,
                auth_token=user.signalwire_auth_token
            )
            logger.info(f"SMS response sent for user {user_id} in {processing_time}ms: {ai_response}")
        except Exception as e:
            logger.error(f"Failed to send SMS response: {e}")

        return Response(status=200)
        
    except Exception as e:
        logger.error(f"SMS webhook error for user {user_id}: {str(e)}")
        return Response(status=500)

@webhooks_bp.route('/test', methods=['POST'])
def test_webhook():
    """Test webhook endpoint"""
    try:
        data = request.get_json() or request.form.to_dict()
        logger.info(f"Test webhook received: {data}")
        
        # This is just a test endpoint, so we don't send a real SMS
        # In a real scenario, you might want to use a test subproject
        
        return jsonify({'message': 'Test webhook received successfully'}), 200
        
    except Exception as e:
        logger.error(f"Test webhook error: {str(e)}")
        return jsonify({'error': 'Test webhook failed'}), 500