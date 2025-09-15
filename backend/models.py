from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    stripe_customer_id = db.Column(db.String(120), unique=True)
    ghost_number = db.Column(db.String(20), unique=True)
    signalwire_subproject_id = db.Column(db.String(120), unique=True)
    training_data_path = db.Column(db.String(255))
    subscription_plan = db.Column(db.String(50))
    trial_expires_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc) + db.timedelta(days=14))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    contact_number = db.Column(db.String(20), nullable=False)
    last_message = db.Column(db.Text)
    last_message_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    unread = db.Column(db.Boolean, default=True)
    flagged = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'contact_number': self.contact_number,
            'last_message': self.last_message,
            'last_message_at': self.last_message_at.isoformat(),
            'unread': self.unread,
            'flagged': self.flagged
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False)
    sender = db.Column(db.String(20), nullable=False) # 'user' or 'ai'
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'conversation_id': self.conversation_id,
            'sender': self.sender,
            'content': self.content,
            'created_at': self.created_at.isoformat()
        }
