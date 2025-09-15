# app/utils/security.py
import hmac
import hashlib
from flask import request

def verify_signalwire_signature(token):
    """Verifies the SignalWire signature of an incoming request."""
    signature = request.headers.get('X-SignalWire-Signature', '')
    url = request.url
    post_data = request.form.to_dict()

    # Sort the POST data by key
    sorted_data = sorted(post_data.items())

    # Concatenate the URL and sorted POST data
    check_str = url
    for k, v in sorted_data:
        check_str += k + v

    # Calculate the HMAC-SHA1 signature
    hmac_signature = hmac.new(
        token.encode(),
        check_str.encode(),
        hashlib.sha1
    ).hexdigest()

    # Compare the calculated signature with the one from the header
    return hmac.compare_digest(hmac_signature, signature)
