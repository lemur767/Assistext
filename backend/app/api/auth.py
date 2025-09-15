# app/api/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .. import db
from ..models import User, PhoneNumberStatus
from ..services import signalwire_service, stripe_service
from ..utils import validate_email, validate_password
import logging

logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)

# Supported countries for phone number provisioning
SUPPORTED_COUNTRIES = {
    'US': {'name': 'United States', 'prefix': '+1'},
    'CA': {'name': 'Canada', 'prefix': '+1'},
    'GB': {'name': 'United Kingdom', 'prefix': '+44'},
    'AU': {'name': 'Australia', 'prefix': '+61'},
}

@auth_bp.route('/register', methods=['POST'])
def register():
    """User registration with SignalWire subproject and phone number provisioning"""
    try:
        data = request.get_json()
        
        # Validate required fields
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        country_code = data.get('country_code', 'CA').upper()
        
        if not email or not password or not country_code:
            return jsonify({'error': 'Email, password, and country are required'}), 400
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate password strength
        password_error = validate_password(password)
        if password_error:
            return jsonify({'error': password_error}), 400
        
        # Check if country is supported
        if country_code not in SUPPORTED_COUNTRIES:
            return jsonify({'error': f'Country {country_code} is not supported'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409
        
        # Start database transaction
        try:
            # 1. Create user
            user = User(email=email, country_code=country_code)
            user.set_password(password)
            
            db.session.add(user)
            db.session.flush()  # Get user ID without committing

            # 2. Create Stripe customer
            stripe_customer = stripe_service.create_customer(email)
            user.stripe_customer_id = stripe_customer.id
            
            # 3. Create SignalWire subproject
            friendly_name = signalwire_service.generate_friendly_name(email, country_code)
            subproject = signalwire_service.create_subproject(friendly_name)
            
            # 4. Search for available phone numbers in the specified country
            available_numbers = signalwire_service.search_available_numbers(country_code, 5)
            
            if not available_numbers:
                raise Exception(f"No phone numbers available for country: {country_code}")
            
            # 5. Purchase the first available number
            selected_number = available_numbers[0]
            webhook_url = signalwire_service.generate_webhook_url(user.id)
            
            purchased_number = signalwire_service.purchase_phone_number(
                selected_number.phone_number,
                subproject.sid,
                webhook_url
            )
            
            # 6. Update user with SignalWire details
            user.signalwire_subproject_id = subproject.sid
            user.signalwire_auth_token = subproject.auth_token
            user.signalwire_friendly_name = subproject.friendly_name
            user.phone_number = purchased_number.phone_number
            user.phone_number_sid = purchased_number.sid
            user.webhook_url = webhook_url
            user.phone_number_status = PhoneNumberStatus.ACTIVE
            
            db.session.commit()
            
            # 7. Generate JWT token
            access_token = create_access_token(identity=user.id)
            
            logger.info(f"User registered successfully: {email} with phone {purchased_number.phone_number}")
            
            return jsonify({
                'message': 'Registration successful',
                'access_token': access_token,
                'user': user.to_dict()
            }), 201
            
        except Exception as e:
            db.session.rollback()
            logger.error(f"Registration failed for {email}: {str(e)}")
            
            return jsonify({'error': f'Registration failed: {str(e)}'}), 500
            
    except Exception as e:
        logger.error(f"Registration endpoint error: {str(e)}")
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login"""
    try:
        data = request.get_json()
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate JWT token
        access_token = create_access_token(identity=user.id)
        
        logger.info(f"User logged in: {email}")
        
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Login endpoint error: {str(e)}")
        return jsonify({'error': 'Login failed. Please try again.'}), 500

@auth_bp.route('/supported-countries', methods=['GET'])
def get_supported_countries():
    """Get list of supported countries"""
    return jsonify({'countries': SUPPORTED_COUNTRIES}), 200