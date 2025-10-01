# backend/app/api/contacts.py
from flask import request, jsonify, Blueprint
from ..utils.auth import token_required

from .. import db
from ..models import Contact, User

contacts_bp = Blueprint('contacts_bp', __name__)

@contacts_bp.route('/contacts', methods=['POST'])
@token_required
def create_contact(current_user):
    data = request.get_json()

    if not data or 'phone_number' not in data or 'name' not in data:
        return jsonify({"error": "Missing phone_number or name"}), 400

    # Check if contact already exists for this user
    existing_contact = Contact.query.filter_by(user_id=current_user.id, phone_number=data['phone_number']).first()
    if existing_contact:
        return jsonify({"error": "Contact with this phone number already exists"}), 409

    new_contact = Contact(
        user_id=current_user.id,
        phone_number=data['phone_number'],
        name=data['name']
    )
    db.session.add(new_contact)
    db.session.commit()

    return jsonify(new_contact.to_dict()), 201

@contacts_bp.route('/contacts', methods=['GET'])
@token_required
def get_contacts(current_user):
    contacts = Contact.query.filter_by(user_id=current_user.id).all()
    return jsonify([contact.to_dict() for contact in contacts]), 200

@contacts_bp.route('/contacts/<int:contact_id>', methods=['PUT'])
@token_required
def update_contact(current_user, contact_id):
    contact = Contact.query.get_or_404(contact_id)

    if contact.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"error": "Missing name"}), 400

    contact.name = data['name']
    db.session.commit()

    return jsonify(contact.to_dict()), 200

@contacts_bp.route('/contacts/<int:contact_id>', methods=['DELETE'])
@token_required
def delete_contact(current_user, contact_id):
    contact = Contact.query.get_or_404(contact_id)

    if contact.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "Contact deleted"}), 200
