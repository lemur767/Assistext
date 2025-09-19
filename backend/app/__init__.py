# app/__init__.py
import os
import logging
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()

def create_app(config_name=None):
    """Application factory function"""
    app = Flask(__name__)

    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', '')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:plmnko1423@localhost:5433/Assistext_Dev')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins="*")
    CORS(app)

    # Set up logging
    logging.basicConfig(level=logging.INFO)

    # Import models to register them with SQLAlchemy
    from .models.user import User, TrialStatus, PhoneNumberStatus
    from .models.conversation import Conversation
    from .models.message import Message, MessageStatus, MessageDirection
    

    # Register blueprints
    from .api.auth import auth_bp
    from .api.conversations import conversations_bp
    from .api.subscriptions import subscriptions_bp
    from .api.users import users_bp
    from .api.webhooks import webhooks_bp
    from .api.chat import chat_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(conversations_bp)
    app.register_blueprint(subscriptions_bp)
    app.register_blueprint(webhooks_bp)
    app.register_blueprint(chat_bp)

    # Register additional routes
    register_general_routes(app)
    register_error_handlers(app)

    return app, socketio

def register_general_routes(app):
    """Register general application routes"""

    @app.route('/')
    def index():
        return jsonify({
            'message': 'Assistext API',
            'version': '1.0.0',
            'status': 'running'
        })

    @app.route('/api/v1/health', methods=['GET'])
    def health_check():
        # Fixed import path
        from .services.ai_service import ai_service

        try:
            ai_status = ai_service.health_check()
            return jsonify({
                'status': 'healthy',
                'database': 'connected',
                'ai_service': ai_status,
                'timestamp': datetime.utcnow().isoformat()
            }), 200
        except Exception as e:
            return jsonify({
                'status': 'unhealthy',
                'error': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }), 500

    @app.route('/api/v1/ai-status', methods=['GET'])
    def ai_status():
        # Fixed import path
        from .services.ai_service import ai_service
        return jsonify(ai_service.get_provider_status()), 200

    @app.route('/api/v1/profile', methods=['GET'])
    def get_profile():
        # Fixed import path
        from .utils.auth import token_required

        @token_required
        def _get_profile(current_user):
            return jsonify(current_user.to_dict()), 200

        return _get_profile()

def register_error_handlers(app):
    """Register error handlers"""

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not found',
            'message': 'The requested resource was not found'
        }), 404

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'error': 'Bad request',
            'message': 'Invalid request data'
        }), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Authentication required'
        }), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'error': 'Forbidden',
            'message': 'Access denied'
        }), 403

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            'error': 'Internal server error',
            'message': 'An unexpected error occurred'
        }), 500