import base64
import hmac
from hashlib import sha1
from flask import request
import logging

def verify_signalwire_signature(token, uri, params):
    """
    Verifies the SignalWire signature of an incoming request manually.
    """
    # Get the signature from the request headers
    signature = request.headers.get('X-SignalWire-Signature', '')
    if not signature:
        return False

    logging.info(f"Incoming Signature: {signature}")
    logging.info(f"Auth Token Used: {token}")
    logging.info(f"Request URL: {uri}")
    logging.info(f"Form Data: {params}")

    # Sort the POST parameters alphabetically
    sorted_params = sorted(params.items())

    # Concatenate the URL and the sorted parameters
    data_string = uri
    for key, value in sorted_params:
        data_string += key + value

    # Compute the HMAC-SHA1 signature
    mac = hmac.new(token.encode('utf-8'), data_string.encode('utf-8'), sha1)
    computed_signature = base64.b64encode(mac.digest()).decode('utf-8')

    logging.info(f"Computed Signature: {computed_signature}")

    # Compare the computed signature with the one from the header
    is_valid = hmac.compare_digest(computed_signature.encode('utf-8'), signature.encode('utf-8'))
    
    logging.info(f"Signature valid: {is_valid}")
    return is_valid
