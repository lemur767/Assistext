"""
Update phone number status for a user
"""
from app import create_app, db
from app.models import User, PhoneNumberStatus

def update_phone_status(user_id, status='active'):
    app = create_app()
    with app.app_context():
        user = User.query.get(user_id)
        if not user:
            print(f"User {user_id} not found!")
            return
        
        print(f"User: {user.email}")
        print(f"Phone: {user.phone_number}")
        print(f"Current status: {user.phone_number_status}")
        
        if status == 'active':
            user.phone_number_status = PhoneNumberStatus.ACTIVE
        elif status == 'provisioning':
            user.phone_number_status = PhoneNumberStatus.PROVISIONING
        elif status == 'failed':
            user.phone_number_status = PhoneNumberStatus.FAILED
        elif status == 'released':
            user.phone_number_status = PhoneNumberStatus.RELEASED
        else:
            print(f"Invalid status: {status}")
            return
        
        db.session.commit()
        print(f"Updated to: {user.phone_number_status}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python update_phone_status.py <user_id> [status]")
        print("Status options: active, provisioning, failed, released (default: active)")
        sys.exit(1)
    
    user_id = int(sys.argv[1])
    status = sys.argv[2] if len(sys.argv) > 2 else 'active'
    update_phone_status(user_id, status)
