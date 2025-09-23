# app/utils/security.py
import hmac
import hashlib
import base64
from flask import request

def verify_signalwire_signature(token):
    """Verifies the SignalWire signature of an incoming request."""
    signature = request.headers.get('X-SignalWire-Signature', '')
    
    # The signature is calculated from the raw POST body
    # The URL and sorted POST data is not used for verification
    # as per the latest SignalWire documentation.
    
    # Calculate the HMAC-SHA1 signature
    hmac_signature = hmac.new(
        token.encode(),
        request.get_data(),
        hashlib.sha1
    ).digest()
    
    # The result should be base64 encoded
    base64_signature = base64.b64encode(hmac_signature).decode()

    # Compare the calculated signature with the one from the header
    return hmac.compare_digest(base64_signature, signature)
