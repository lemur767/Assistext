from .. import db
from datetime import datetime

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    contact_id = db.Column(db.Integer, db.ForeignKey('contacts.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_message_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    unread = db.Column(db.Boolean, default=False, nullable=False)
    controlled_by = db.Column(db.String(10), default='ai', nullable=False) # 'ai' or 'user'

    # Relationships
    messages = db.relationship('Message', backref='conversation', lazy=True, cascade="all, delete-orphan")
    contact = db.relationship('Contact', backref='conversations')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'contact': self.contact.to_dict(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_message_at': self.last_message_at.isoformat() if self.last_message_at else None,
            'unread': self.unread,
            'controlled_by': self.controlled_by
        }

    def __repr__(self):
        return f'<Conversation {self.id} ({self.contact.phone_number}) for User {self.user_id}>'