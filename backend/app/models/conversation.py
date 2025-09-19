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
    controlled_by = db.Column(db.String(10), default='ai', nullable=False) # 'ai' or 'user'

    # Note: Relationships temporarily removed to fix mapper initialization issues
    # TODO: Add back relationships after basic functionality is working

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'contact_number': self.contact_number,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'last_message_at': self.last_message_at.isoformat(),
            'unread': self.unread,
            'controlled_by': self.controlled_by
        }

    def __repr__(self):
        return f'<Conversation {self.id} ({self.contact_number}) for User {self.user_id}>'