# app/routes/phone_numbers.py
from flask import Blueprint, request, jsonify
import logging
from datetime import datetime
import os
from ..models.user import User
from ..services.signalwire_service import signalwire_service
from ..utils.auth import token_required
from .. import db

logger = logging.getLogger(__name__)

# Create blueprint
from . import api_bp as phone_numbers_bp

@phone_numbers_bp.route('/ghost-numbers', methods=['POST'])
@token_required
def provision_ghost_number(current_user):
    try:
        if current_user.phone_number:
            return jsonify({'error': 'User already has a phone number'}), 400
        
        # Create subproject for user
        friendly_name = signalwire_service.generate_friendly_name(current_user.email)
        subproject = signalwire_service.create_subproject(friendly_name)
        
        # Search for available numbers
        available_numbers = signalwire_service.search_available_numbers(
            current_user.country_code, limit=1
        )
        
        if not available_numbers:
            return jsonify({'error': 'No phone numbers available in your region'}), 404
        
        # Purchase the first available number
        phone_number = available_numbers[0].phone_number
        webhook_url = signalwire_service.generate_webhook_url(current_user.id)
        
        purchased_number = signalwire_service.purchase_phone_number(
            phone_number, subproject.sid, webhook_url
        )
        
        # Update user with phone number info
        current_user.signalwire_subproject_id = subproject.sid
        current_user.signalwire_auth_token = subproject.auth_token
        current_user.signalwire_friendly_name = subproject.friendly_name
        current_user.phone_number = purchased_number.phone_number
        current_user.phone_number_sid = purchased_number.sid
        current_user.webhook_url = webhook_url
        current_user.phone_number_status = 'active'
        
        db.session.commit()
        
        logger.info(f"Phone number provisioned for {current_user.email}: {phone_number}")
        
        return jsonify({
            'phone_number': phone_number,
            'status': 'active'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Phone number provisioning failed: {e}")
        return jsonify({'error': f'Failed to provision phone number: {str(e)}'}), 500

@phone_numbers_bp.route('/ghost-numbers', methods=['GET'])
@token_required
def get_ghost_number_status(current_user):
    return jsonify({
        'phone_number': current_user.phone_number,
        'status': current_user.phone_number_status.value if current_user.phone_number_status else None,
        'provisioned': bool(current_user.phone_number)
    }), 200