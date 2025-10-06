# backend/app/scheduler.py
from . import db
from .models import User, TrialStatus, PhoneNumberStatus
from .services.signalwire_service import signalwire_service
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def deactivate_expired_trials():
    """Deactivate ghost numbers for users with expired trials and no active subscription."""
    logger.info("Running deactivate_expired_trials job...")
    try:
        expired_users = User.query.filter(
            User.trial_status == TrialStatus.ACTIVE,
            User.trial_expires_at < datetime.utcnow()
        ).all()

        for user in expired_users:
            # TODO: Check for active subscription
            has_active_subscription = False

            if not has_active_subscription:
                logger.info(f"Deactivating number for user {user.id} with expired trial.")
                user.trial_status = TrialStatus.EXPIRED
                user.phone_number_status = PhoneNumberStatus.RELEASED

                try:
                    if user.phone_number_sid and user.signalwire_subproject_id:
                        signalwire_service.release_phone_number(
                            user.phone_number_sid,
                            user.signalwire_subproject_id
                        )
                    db.session.commit()
                except Exception as e:
                    logger.error(f"Failed to release SignalWire number for user {user.id}: {e}")
                    db.session.rollback()

    except Exception as e:
        logger.error(f"Error in deactivate_expired_trials job: {e}")