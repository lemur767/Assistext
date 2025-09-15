# app/routes/__init__.py
from .auth import auth_bp
from .conversations import conversations_bp
from .phone_numbers import phone_numbers_bp
from .webhooks import webhooks_bp

__all__ = ['auth_bp', 'conversations_bp', 'phone_numbers_bp', 'webhooks_bp']