# backend/app/api/contacts.py
from flask import Blueprint, request, jsonify
from ..utils.auth import token_required
from .. import db
from ..models import Contact

contacts_bp = Blueprint('contacts_bp', __name__)

@contacts_bp.route('/', methods=['GET'])
@token_required
def get_contacts(current_user):
    contacts = Contact.query.filter_by(user_id=current_user.id).all()
    return jsonify([contact.to_dict() for contact in contacts])

@contacts_bp.route('/', methods=['POST'])
@token_required
def create_contact(current_user):
    data = request.get_json()
    if not data or not 'name' in data or not 'phone_number' in data:
        return jsonify({'error': 'Missing data'}), 400

    # Check if contact with the same number already exists for this user
    existing_contact = Contact.query.filter_by(user_id=current_user.id, phone_number=data['phone_number']).first()
    if existing_contact:
        return jsonify({'error': 'Contact with this phone number already exists'}), 409

    new_contact = Contact(
        user_id=current_user.id,
        name=data['name'],
        phone_number=data['phone_number']
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify(new_contact.to_dict()), 201

@contacts_bp.route('/<int:contact_id>', methods=['PUT'])
@token_required
def update_contact(current_user, contact_id):
    contact = Contact.query.filter_by(id=contact_id, user_id=current_user.id).first_or_404()
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing data'}), 400

    if 'name' in data:
        contact.name = data['name']
    if 'phone_number' in data:
        # Check if another contact with the new number already exists
        existing_contact = Contact.query.filter_by(user_id=current_user.id, phone_number=data['phone_number']).first()
        if existing_contact and existing_contact.id != contact_id:
            return jsonify({'error': 'Contact with this phone number already exists'}), 409
        contact.phone_number = data['phone_number']

    db.session.commit()
    return jsonify(contact.to_dict())

@contacts_bp.route('/<int:contact_id>', methods=['DELETE'])
@token_required
def delete_contact(current_user, contact_id):
    contact = Contact.query.filter_by(id=contact_id, user_id=current_user.id).first_or_404()
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contact deleted successfully'})