import pytest
import json
from unittest.mock import patch, MagicMock
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models.user import User

from flask_jwt_extended import JWTManager

@pytest.fixture
def client():
    app = create_app('testing')
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:plmnko1423@localhost:5432/Assist_Test'
    app.config['JWT_SECRET_KEY'] = 'xbaxf2xfflx16x95xcaxb3xdfxe6xb5!x1excaxd6x15Cxd7x97x08xb9x97x8exf5BpSx13'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'
    jwt = JWTManager(app)
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

@patch('app.api.auth.create_stripe_customer')
@patch('app.api.auth.signalwire_service')
def test_register(mock_signalwire_service, mock_create_stripe_customer, client):
    """Test user registration"""
    # Mock Stripe customer creation
    mock_stripe_customer = MagicMock()
    mock_stripe_customer.id = 'cus_123'
    mock_create_stripe_customer.return_value = mock_stripe_customer

    # Mock SignalWire subproject creation
    mock_subproject = MagicMock()
    mock_subproject.sid = 'sub_123'
    mock_subproject.auth_token = 'auth_token_123'
    mock_subproject.friendly_name = 'friendly_name_123'
    mock_signalwire_service.create_subproject.return_value = mock_subproject

    # Mock SignalWire number search
    mock_available_number = MagicMock()
    mock_available_number.phone_number = '+15551234567'
    mock_signalwire_service.search_available_numbers.return_value = [mock_available_number]

    # Mock SignalWire number purchase
    mock_purchased_number = MagicMock()
    mock_purchased_number.sid = 'pn_123'
    mock_purchased_number.phone_number = '+15551234567'
    mock_signalwire_service.purchase_phone_number.return_value = mock_purchased_number
    
    mock_signalwire_service.generate_friendly_name.return_value = "friendly_name"
    mock_signalwire_service.generate_webhook_url.return_value = "http://example.com/webhook"

    # Registration data
    data = {
        'email': 'test@example.com',
        'password': 'Password123!',
        'country_code': 'US',
        'first_name': 'Test',
        'last_name': 'User',
        'city': 'Test City'
    }

    # Send registration request
    response = client.post('/register', data=json.dumps(data), content_type='application/json')

    # Check response
    assert response.status_code == 201
    json_data = response.get_json()
    assert 'access_token' in json_data
    assert json_data['user']['email'] == 'test@example.com'
    assert json_data['phone_number'] == '+15551234567'
    assert json_data['phone_number_status'] == 'active'

    # Check that mocks were called
    mock_create_stripe_customer.assert_called_once()
    mock_signalwire_service.create_subproject.assert_called_once()
    mock_signalwire_service.search_available_numbers.assert_called_once()
    mock_signalwire_service.purchase_phone_number.assert_called_once()

    # Check that user was created in the database
    user = User.query.filter_by(email='test@example.com').first()
    assert user is not None
    assert user.stripe_customer_id == 'cus_123'
    assert user.signalwire_subproject_id == 'sub_123'
