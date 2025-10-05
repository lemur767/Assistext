# app/api/__init__.py
from flask import Blueprint

# This blueprint will be used by all API routes
api_bp = Blueprint('api', __name__)

# Import the routes to register them with the blueprint
from . import auth, conversations, subscriptions, users, webhooks, ghost_numbers, chat, contacts

# Explicitly register the blueprints to fix the routing issue.
api_bp.register_blueprint(auth.auth_bp, url_prefix='/auth')
api_bp.register_blueprint(conversations.conversations_bp, url_prefix='/conversations')
api_bp.register_blueprint(subscriptions.subscriptions_bp, url_prefix='/subscriptions')
api_bp.register_blueprint(users.users_bp, url_prefix='/users')
api_bp.register_blueprint(webhooks.webhooks_bp, url_prefix='/webhooks')
api_bp.register_blueprint(ghost_numbers.ghost_numbers_bp, url_prefix='/ghost-numbers')
api_bp.register_blueprint(contacts.contacts_bp, url_prefix='/contacts')
