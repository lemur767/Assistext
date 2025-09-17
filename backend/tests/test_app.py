import pytest
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from flask_jwt_extended import JWTManager

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    jwt = JWTManager(app)
    with app.test_client() as client:
        yield client

def test_hello_world(client):
    rv = client.get('/')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['message'] == 'Assistext API'