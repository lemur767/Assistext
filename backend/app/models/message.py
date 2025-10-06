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
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False, index=True)
    
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
    sentiment = db.Column(db.Float, nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'conversation_id': self.conversation_id,
            'message_sid': self.message_sid,
            'from_number': self.from_number,
            'to_number': self.to_number,
            'body': self.body,
            'direction': self.direction.value if self.direction else None,
            'status': self.status.value if self.status else None,
            'num_media': self.num_media,
            'ai_generated': self.ai_generated,
            'processing_time_ms': self.processing_time_ms,
            'sentiment': self.sentiment,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Message {self.id}: {self.direction.value} - {self.from_number} -> {self.to_number}>'