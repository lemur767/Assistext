# app/utils/security.py
from twilio.request_validator import RequestValidator
from flask import request
import logging

def verify_signalwire_signature(token, url, form_data):
    """Verifies the SignalWire signature of an incoming request."""
    signature = request.headers.get('X-SignalWire-Signature', '')
    logging.info(f"Incoming Signature: {signature}")
    logging.info(f"Auth Token Used: {token}")
    logging.info(f"Request URL: {url}")
    logging.info(f"Form Data: {form_data}")

    validator = RequestValidator(token)

    is_valid = validator.validate(
        url,
        form_data,
        signature
    )

    logging.info(f"Signature valid: {is_valid}")
    return is_valid
