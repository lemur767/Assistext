# app/models/user.py
from .. import db
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import enum

class TrialStatus(enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    UPGRADED = "upgraded"

class PhoneNumberStatus(enum.Enum):
    PROVISIONING = "provisioning"
    ACTIVE = "active"
    FAILED = "failed"
    RELEASED = "released"

class SubscriptionPlan(enum.Enum):
    TRIAL = "trial"
    BASIC = "basic"
    PRO = "pro"

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=True)
    last_name = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=True)
    state = db.Column(db.String(255), nullable=True)
    country_code = db.Column(db.String(5), nullable=False, default='US')
    
    # SignalWire fields
    signalwire_subproject_id = db.Column(db.String(255))
    signalwire_auth_token = db.Column(db.String(255)) # PT key for sending
    signalwire_signing_key = db.Column(db.String(255)) # PSK for validation
    signalwire_friendly_name = db.Column(db.String(255))
    phone_number = db.Column(db.String(20))
    phone_number_sid = db.Column(db.String(255))
    phone_number_status = db.Column(db.Enum(PhoneNumberStatus), default=PhoneNumberStatus.PROVISIONING)
    webhook_url = db.Column(db.String(500))
    
    # Stripe fields
    stripe_customer_id = db.Column(db.String(255))
    subscription_plan = db.Column(db.Enum(SubscriptionPlan), default=SubscriptionPlan.TRIAL)
    message_count = db.Column(db.Integer, default=0)
    
    # Trial fields
    trial_status = db.Column(db.Enum(TrialStatus), default=TrialStatus.ACTIVE)
    trial_expires_at = db.Column(db.DateTime, default=lambda: datetime.utcnow() + timedelta(days=7))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Notification settings
    keyword_triggers = db.Column(db.JSON, default=lambda: [])

    # AI Customization
    ai_system_prompt = db.Column(db.Text, nullable=True)
    ai_tone = db.Column(db.Text, nullable=True)
    include_ai_signature = db.Column(db.Boolean, default=True, nullable=False)
    
    # Relationships
    conversations = db.relationship('Conversation', backref='user', lazy=True, cascade="all, delete-orphan")
    messages = db.relationship('Message', backref='user', lazy=True, cascade="all, delete-orphan")
    contacts = db.relationship('Contact', backref='user', lazy=True, cascade="all, delete-orphan")
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @property
    def trial_days_remaining(self):
        if self.trial_expires_at:
            remaining = (self.trial_expires_at - datetime.utcnow()).days
            return max(0, remaining)
        return 0
    
    @property
    def is_trial_active(self):
        return (self.trial_status == TrialStatus.ACTIVE and 
                self.trial_days_remaining > 0)
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'email': self.email,
            'country_code': self.country_code,
            'phone_number': self.phone_number,
            'phone_number_status': self.phone_number_status.value if self.phone_number_status else None,
            'trial_status': self.trial_status.value,
            'trial_expires_at': self.trial_expires_at.isoformat() if self.trial_expires_at else None,
            'trial_days_remaining': self.trial_days_remaining,
            'is_trial_active': self.is_trial_active,
            'created_at': self.created_at.isoformat(),
            'signalwire_friendly_name': self.signalwire_friendly_name,
            'keyword_triggers': self.keyword_triggers,
            'subscription_plan': self.subscription_plan.value if self.subscription_plan else None,
            'message_count': self.message_count
        }
        
        if include_sensitive:
            data.update({
                'signalwire_subproject_id': self.signalwire_subproject_id,
                'webhook_url': self.webhook_url
            })
        
        return data

    def __repr__(self):
        return f'<User {self.email}>'