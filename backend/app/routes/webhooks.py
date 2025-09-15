# app/routes/webhooks.py
from flask import Blueprint, request
import logging

from ..models.user import User
from ..models.message import Message
from ..services.ai_service import ai_service
from ..services.laml_service import laml_service
from .. import db

logger = logging.getLogger(__name__)

# Create blueprint
webhooks_bp = Blueprint('webhooks', __name__, url_prefix='/api/v1')

@webhooks_bp.route('/webhooks/sms/<int:user_id>', methods=['POST'])
def handle_sms_webhook(user_id):
    try:
        # Get user
        user = User.query.get(user_id)
        if not user:
            logger.error(f"Webhook received for non-existent user: {user_id}")
            return laml_service.create_error_response(), 404
        
        # Parse incoming SMS data
        from_number = request.form.get('From')
        to_number = request.form.get('To')
        body = request.form.get('Body', '')
        message_sid = request.form.get('MessageSid')
        
        logger.info(f"Received SMS for user {user_id}: {from_number} -> {to_number}")
        
        # Save incoming message
        incoming_message = Message(
            user_id=user.id,
            message_sid=message_sid,
            from_number=from_number,
            to_number=to_number,
            body=body,
            direction='inbound',
            status='received'
        )
        db.session.add(incoming_message)
        
        # Generate AI response
        ai_response = ai_service.generate_response(
            user_message=body,
            user_email=user.email
        )
        
        # Save AI response message
        response_message = Message(
            user_id=user.id,
            from_number=to_number,
            to_number=from_number,
            body=ai_response,
            direction='outbound',
            ai_generated=True,
            status='delivered'
        )
        db.session.add(response_message)
        db.session.commit()
        
        logger.info(f"Generated AI response for user {user_id}: {ai_response[:50]}...")
        
        # Return LaML response
        return laml_service.create_message_response(ai_response), 200
        
    except Exception as e:
        logger.error(f"Webhook processing failed: {e}")
        return laml_service.create_error_response(), 500