from flask import Blueprint, request, jsonify, current_app
from werkzeug.exceptions import BadRequest, Conflict, Unauthorized
import jwt
from datetime import datetime, timedelta

from .. import db, limiter
from ..models.user import User, PhoneNumberStatus
from ..services.signalwire_service import signalwire_service
from ..services.stripe_service import create_stripe_customer
from ..utils.validators import validate_email, validate_password
import logging

logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)

SUPPORTED_COUNTRIES = {
    'US': {'name': 'United States', 'prefix': '+1'},
    'CA': {'name': 'Canada', 'prefix': '+1'},
    'GB': {'name': 'United Kingdom', 'prefix': '+44'},
    'AU': {'name': 'Australia', 'prefix': '+61'},
}

def _generate_jwt(user):
    try:
        token_payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.now() + timedelta(days=30)
        }
        access_token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        if isinstance(access_token, bytes):
            access_token = access_token.decode('utf-8')
        return access_token
    except Exception as e:
        logger.error(f"Token generation failed: {e}")
        return "token_generation_failed"

@auth_bp.route('/register', methods=['POST'])
@limiter.limit("5 per hour")
def register():
    data = request.get_json()
    if not data:
        raise BadRequest("Invalid JSON")

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    country_code = data.get('country_code', 'CA').upper()
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    city = data.get('city', '')

    if not all([email, password, country_code, first_name, last_name]):
        raise BadRequest("Missing required fields")

    if not validate_email(email):
        raise BadRequest("Invalid email format")

    password_error = validate_password(password)
    if password_error:
        raise BadRequest(password_error)

    if country_code not in SUPPORTED_COUNTRIES:
        raise BadRequest(f'Country {country_code} is not supported')

    if User.query.filter_by(email=email).first():
        raise Conflict('Email already registered')

    try:
        user = User(email=email, country_code=country_code, city=city, first_name=first_name, last_name=last_name)
        user.set_password(password)
        db.session.add(user)
        db.session.flush()

        try:
            name = f"{first_name} {last_name}".strip()
            stripe_customer = create_stripe_customer(email=email, name=name, country_code=country_code, city=city, user_id=user.id)
            user.stripe_customer_id = stripe_customer.id
            logger.info(f"Created Stripe customer for {email}: {stripe_customer.id}")
        except Exception as e:
            logger.error(f"Failed to create Stripe customer for {email}: {e}")

        try:
            friendly_name = signalwire_service.generate_friendly_name(email)
            subproject = signalwire_service.create_subproject(friendly_name)
            available_numbers = signalwire_service.search_available_numbers(country_code, 5, city=city, region=user.state)
            if not available_numbers:
                raise Exception(f"No phone numbers available for country: {country_code}")

            selected_number = available_numbers[0]
            webhook_url = signalwire_service.generate_webhook_url(user.id)
            purchased_number = signalwire_service.purchase_phone_number(selected_number.phone_number, subproject.sid, subproject.auth_token, webhook_url)

            user.signalwire_subproject_id = subproject.sid
            user.signalwire_auth_token = subproject.auth_token
            user.signalwire_signing_key = subproject.signing_key
            user.signalwire_friendly_name = subproject.friendly_name
            user.phone_number = purchased_number.phone_number
            user.phone_number_sid = purchased_number.sid
            user.webhook_url = webhook_url
            user.phone_number_status = PhoneNumberStatus.ACTIVE
            logger.info(f"Purchased phone number for {email}: {purchased_number.phone_number}")
        except Exception as e:
            logger.error(f"SignalWire setup failed for {email}: {e}")
            user.phone_number_status = PhoneNumberStatus.FAILED

        db.session.commit()

        access_token = _generate_jwt(user)

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
        raise

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    data = request.get_json()
    if not data:
        raise BadRequest("Invalid JSON")

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        raise BadRequest("Email and password are required")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        raise Unauthorized("Invalid credentials")

    access_token = _generate_jwt(user)
    logger.info(f"User logged in: {email}")

    return jsonify({
        'token': access_token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/supported-countries', methods=['GET'])
def get_supported_countries():
    return jsonify({'countries': SUPPORTED_COUNTRIES}), 200