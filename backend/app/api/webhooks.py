# app/api/webhooks.py - Updated handle_sms_webhook function
from flask import Blueprint, request, Response, jsonify
from .. import db, socketio
from ..models import User, Message, Conversation, Contact, MessageDirection, MessageStatus, PhoneNumberStatus, SubscriptionPlan
from ..services import ai_service, signalwire_service, laml_service
from ..utils.security import verify_signalwire_signature
import logging
import time
from datetime import datetime

from textblob import TextBlob

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

        # 1a. Check if phone number is active
        if user.phone_number_status != PhoneNumberStatus.ACTIVE:
            logger.warning(f"Webhook received for inactive number for user {user_id}")
            return Response(status=200) # Return 200 to prevent SignalWire from retrying

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
            laml_response = laml_service.create_message_response("Your trial has expired. Please subscribe to continue using this service.")
            return Response(laml_response, mimetype='application/xml')

        # 3a. Check message limits
        message_limits = {
            SubscriptionPlan.TRIAL: 10,
            SubscriptionPlan.BASIC: 100,
            SubscriptionPlan.PRO: 1000
        }
        limit = message_limits.get(user.subscription_plan)

        if limit is not None and user.message_count >= limit:
            logger.warning(f"User {user_id} has exceeded their message limit for the {user.subscription_plan.value} plan.")
            # Optionally, send a notification to the user
            # signalwire_service.send_sms(...)
            return Response(status=200)
        
        # 4. Find or create contact and conversation
        contact = Contact.query.filter_by(user_id=user.id, phone_number=from_number).first()
        if not contact:
            contact = Contact(user_id=user.id, phone_number=from_number, name=from_number)
            db.session.add(contact)
            db.session.flush()

        conversation = Conversation.query.filter_by(
            user_id=user.id,
            contact_id=contact.id
        ).first()
        
        if not conversation:
            conversation = Conversation(
                user_id=user.id,
                contact_id=contact.id,
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
                conversation_id=conversation.id,  # Link to conversation
                user_id=user.id,
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

            # 5a. Check for keyword triggers
            if user.keyword_triggers:
                for keyword in user.keyword_triggers:
                    if keyword.lower() in body.lower():
                        logger.info(f"Keyword trigger '{keyword}' found for user {user_id} in conversation {conversation.id}")
                        # TODO: Send email notification
                        break
            
            # 5b. Sentiment analysis
            try:
                blob = TextBlob(body)
                sentiment_polarity = blob.sentiment.polarity
                incoming_message.sentiment = sentiment_polarity
                db.session.commit()

                if sentiment_polarity < -0.2:
                    logger.info(f"Negative sentiment detected for user {user_id} in conversation {conversation.id}")
                    # TODO: Send email notification
            except Exception as e:
                logger.error(f"Sentiment analysis failed: {e}")

            # 5c. Increment message count
            try:
                user.message_count += 1
                db.session.commit()
            except Exception as e:
                logger.error(f"Failed to increment message count for user {user_id}: {e}")
                db.session.rollback()

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
                conversation_id=conversation.id,  # Link to conversation
                user_id=user.id,
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
            laml_response = laml_service.create_message_response(ai_response)
            logger.info(f"Generated LaML response for user {user_id}: {laml_response}")
            return Response(laml_response, mimetype='application/xml')
        except Exception as e:
            logger.error(f"Failed to generate LaML response: {e}")
            return Response(status=500)
        
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
