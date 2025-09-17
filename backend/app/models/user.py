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

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=True)
    last_name = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=True)
    country_code = db.Column(db.String(5), nullable=False, default='US')
    
    # SignalWire fields
    signalwire_subproject_id = db.Column(db.String(255))
    signalwire_auth_token = db.Column(db.String(255))
    signalwire_friendly_name = db.Column(db.String(255))
    phone_number = db.Column(db.String(20))
    phone_number_sid = db.Column(db.String(255))
    phone_number_status = db.Column(db.Enum(PhoneNumberStatus), default=PhoneNumberStatus.PROVISIONING)
    webhook_url = db.Column(db.String(500))
    
    # Stripe fields
    stripe_customer_id = db.Column(db.String(255))
    
    # Trial fields
    trial_status = db.Column(db.Enum(TrialStatus), default=TrialStatus.ACTIVE)
    trial_expires_at = db.Column(db.DateTime, default=lambda: datetime.utcnow() + timedelta(days=7))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Note: Relationships temporarily removed to fix mapper initialization issues
    # TODO: Add back relationships after basic functionality is working
    
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
            'signalwire_friendly_name': self.signalwire_friendly_name
        }
        
        if include_sensitive:
            data.update({
                'signalwire_subproject_id': self.signalwire_subproject_id,
                'webhook_url': self.webhook_url
            })
        
        return data

    def __repr__(self):
        return f'<User {self.email}>'