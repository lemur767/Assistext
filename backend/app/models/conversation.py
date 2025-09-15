from .. import db
from datetime import datetime

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    contact_number = db.Column(db.String(15), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_message_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    unread = db.Column(db.Boolean, default=False, nullable=False)

    # Relationships - use back_populates for bidirectional relationships
    messages = db.relationship('Message', back_populates='conversation', lazy=True, cascade='all, delete-orphan')
    user = db.relationship('User', back_populates='conversations')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'contact_number': self.contact_number,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'last_message_at': self.last_message_at.isoformat(),
            'unread': self.unread
        }

    def __repr__(self):
        return f'<Conversation {self.id} ({self.contact_number}) for User {self.user_id}>'