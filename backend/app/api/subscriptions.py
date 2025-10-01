# app/api/subscriptions.py
from flask import Blueprint, jsonify, request
from ..utils.auth import token_required
import stripe

subscriptions_bp = Blueprint('subscriptions', __name__, 'url_prefix=/api/v1/subscriptions')

@subscriptions_bp.route('/plans', methods=['GET'])
@token_required
def get_subscription_plans(current_user):
    """Get available subscription plans from Stripe."""
    try:
        products = stripe.Product.list(active=True, expand=['data.default_price'])
        plans = []
        for product in products.data:
            plans.append({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.default_price.unit_amount / 100, # Convert from cents
                'currency': product.default_price.currency,
                'price_id': product.default_price.id
            })
        return jsonify(plans), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@subscriptions_bp.route('/create-payment-intent', methods=['POST'])
@token_required
def create_payment_intent(current_user):
    """Creates a Stripe Payment Intent for a selected plan."""
    try:
        data = request.get_json()
        price_id = data.get('price_id')

        if not price_id:
            return jsonify({'error': 'Price ID is required'}), 400

        # Fetch the price details from Stripe
        price = stripe.Price.retrieve(price_id)

        # Create a Payment Intent
        intent = stripe.PaymentIntent.create(
            amount=price.unit_amount,
            currency=price.currency,
            payment_method_types=['card'],
        )
        return jsonify({'client_secret': intent.client_secret}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500