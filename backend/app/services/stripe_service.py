# app/services/stripe_service.py
import stripe
import os


stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

def create_stripe_customer(email, first_name, last_name, country_code, city, user_id):
    
    try:
        customer = stripe.Customer.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
            address={
                "country": country_code,
                "city": city,
            },metadata={
                "assist_id":user_id
            }
        )
       
    except Exception as e:
        # Handle Stripe API errors
        raise e
        
    return customer

def create_checkout_session(customer_id, price_id, success_url, cancel_url):
    """Creates a new Stripe Checkout Session."""
    try:
        checkout_session = stripe.checkout.Session.create(
            customer=customer_id,
            line_items=[{"price": price_id, "quantity": 1}],
            mode="subscription",
            success_url=success_url,
            cancel_url=cancel_url,
        )
        return checkout_session
    except Exception as e:
        raise e 
