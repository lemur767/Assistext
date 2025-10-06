# app/api/subscriptions.py
from flask import Blueprint, jsonify, request
from ..utils.auth import token_required
import stripe
from .. import db
from ..models import User, TrialStatus, SubscriptionPlan

subscriptions_bp = Blueprint('subscriptions', __name__)

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

@subscriptions_bp.route('/', methods=['GET'])
@token_required
def get_subscription(current_user):
    """Get user's subscription."""
    try:
        subscriptions = stripe.Subscription.list(customer=current_user.stripe_customer_id)
        if subscriptions.data:
            return jsonify(subscriptions.data[0]), 200
        return jsonify({'message': 'No active subscription found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@subscriptions_bp.route('/', methods=['POST'])
@token_required
def create_subscription(current_user):
    """Create a new subscription."""
    try:
        data = request.get_json()
        price_id = data.get('price_id')
        payment_method_id = data.get('payment_method_id')

        if not price_id or not payment_method_id:
            return jsonify({'error': 'price_id and payment_method_id are required'}), 400

        # Attach the payment method to the customer
        stripe.PaymentMethod.attach(
            payment_method_id,
            customer=current_user.stripe_customer_id,
        )

        # Set the default payment method on the customer
        stripe.Customer.modify(
            current_user.stripe_customer_id,
            invoice_settings={'default_payment_method': payment_method_id},
        )

        # Create the subscription
        subscription = stripe.Subscription.create(
            customer=current_user.stripe_customer_id,
            items=[{'price': price_id}],
            expand=['latest_invoice.payment_intent'],
        )

        # Update user's subscription plan
        product = stripe.Product.retrieve(subscription.plan.product)
        plan_name = product.name.lower()
        if plan_name in [plan.value for plan in SubscriptionPlan]:
            current_user.subscription_plan = SubscriptionPlan(plan_name)
        
        current_user.trial_status = TrialStatus.UPGRADED
        db.session.commit()

        return jsonify(subscription), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
