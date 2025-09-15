# app/services/stripe_service.py
import stripe
import os

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

def create_customer(email):
    """Creates a new customer in Stripe."""
    try:
        customer = stripe.Customer.create(
            email=email,
        )
        return customer
    except Exception as e:
        # Handle Stripe API errors
        raise e
