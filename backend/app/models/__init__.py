# Import models in the correct order to ensure proper registration
from .user import User, TrialStatus, PhoneNumberStatus
from .conversation import Conversation
from .message import Message, MessageDirection, MessageStatus
from .contact import Contact

__all__ = [
    'User', 
    'Message', 
    'Conversation',
    'TrialStatus', 
    'PhoneNumberStatus', 
    'MessageDirection', 
    'MessageStatus'
]