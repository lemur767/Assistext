# app/api/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash

from .. import db
from ..models.user import User, PhoneNumberStatus
from ..services.signalwire_service import signalwire_service
from ..services.stripe_service import create_stripe_customer
from ..utils.validators import validate_email, validate_password
import logging

logger = logging.getLogger(__name__)

from . import api_bp as auth_bp

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
        last_name = data.get('last_name', '')
        first_name = data.get('first_name', '')
        city = data.get('city', '')
        name = f"{data.get('first_name')} {data.get('last_name')}".strip() 
                
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
            user = User(email=email, country_code=country_code, city=city, first_name=first_name, last_name=last_name)
            user.set_password(password)
            
            db.session.add(user)
            db.session.flush()  # Get user ID without committing

            # 2. Create Stripe customer
            try:
                name = f"{first_name} {last_name}".strip()
                stripe_customer = create_stripe_customer(
                    email=email,
                    name=name,
                    country_code=country_code,
                    city=city,
                    user_id=user.id
                )
                user.stripe_customer_id = stripe_customer.id
                logger.info(f"Created Stripe customer for {email}: {stripe_customer.id}")
            except Exception as e:
                logger.error(f"Failed to create Stripe customer for {email}: {e}")
                # Continue without Stripe for now
                pass
            
            # 3. Create SignalWire subproject
            try:
                friendly_name = signalwire_service.generate_friendly_name(email)
                subproject = signalwire_service.create_subproject(friendly_name)
                logger.info(f"Created SignalWire subproject for {email}: {subproject.sid}")
                
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
                
                logger.info(f"Purchased phone number for {email}: {purchased_number.phone_number}")
                
            except Exception as e:
                logger.error(f"SignalWire setup failed for {email}: {e}")
                # Set phone number status to failed but don't block registration
                user.phone_number_status = PhoneNumberStatus.FAILED
                # Continue with registration
            
            db.session.commit()
            
            # 7. Generate JWT token (you'll need to install flask-jwt-extended or use regular JWT)
            try:
                from flask import current_app
                import jwt
                from datetime import datetime, timedelta
                
                token_payload = {
                    'user_id': user.id,
                    'email': user.email,
                    'exp': datetime.now() + timedelta(days=30)
                }
                access_token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')
            except Exception as e:
                logger.error(f"Token generation failed: {e}")
                access_token = "token_generation_failed"
            
            logger.info(f"User registered successfully: {email} with phone {user.phone_number or 'FAILED'}")
            
            return jsonify({
                'message': 'Registration successful',
                'access_token': access_token,
                'user': user.to_dict(),
                'phone_number': user.phone_number,
                'phone_number_status': user.phone_number_status.value if user.phone_number_status else None
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
        try:
            from flask import current_app
            import jwt
            from datetime import datetime, timedelta
            
            token_payload = {
                'user_id': user.id,
                'email': user.email,
                'exp': datetime.now() + timedelta(days=30)
            }
            access_token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        except Exception as e:
            logger.error(f"Token generation failed: {e}")
            access_token = "token_generation_failed"
        
        logger.info(f"User logged in: {email}")
        
        return jsonify({
            'token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Login endpoint error: {str(e)}")
        return jsonify({'error': 'Login failed. Please try again.'}), 500

@auth_bp.route('/supported-countries', methods=['GET'])
def get_supported_countries():
    """Get list of supported countries"""
    return jsonify({'countries': SUPPORTED_COUNTRIES}), 200