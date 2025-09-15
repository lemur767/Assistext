# app/models/message.py
from .. import db
from datetime import datetime
import enum

class MessageDirection(enum.Enum):
    INBOUND = "inbound"
    OUTBOUND = "outbound"

class MessageStatus(enum.Enum):
    RECEIVED = "received"
    PROCESSING = "processing"
    DELIVERED = "delivered"
    FAILED = "failed"

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # SignalWire fields
    message_sid = db.Column(db.String(255), index=True)
    from_number = db.Column(db.String(20), nullable=False)
    to_number = db.Column(db.String(20), nullable=False)
    body = db.Column(db.Text)
    
    # Message metadata
    direction = db.Column(db.Enum(MessageDirection), nullable=False)
    status = db.Column(db.Enum(MessageStatus), default=MessageStatus.RECEIVED)
    num_media = db.Column(db.Integer, default=0)
    
    # AI response metadata
    ai_generated = db.Column(db.Boolean, default=False)
    processing_time_ms = db.Column(db.Integer)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message_sid': self.message_sid,
            'from_number': self.from_number,
            'to_number': self.to_number,
            'body': self.body,
            'direction': self.direction.value,
            'status': self.status.value,
            'num_media': self.num_media,
            'ai_generated': self.ai_generated,
            'processing_time_ms': self.processing_time_ms,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<Message {self.id}: {self.direction.value} - {self.from_number} -> {self.to_number}>'