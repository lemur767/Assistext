# app/api/__init__.py
from flask import Blueprint

# This blueprint will be used by all API routes
api_bp = Blueprint('api', __name__)

# Import the routes to register them with the blueprint
from . import auth, conversations, subscriptions, users, webhooks, ghost_numbers, chat, contacts

# Explicitly register the webhooks blueprint to fix the routing issue.
# Other blueprints are handled within their respective modules or are for websockets.
api_bp.register_blueprint(webhooks.webhooks_bp, url_prefix='/webhooks')



