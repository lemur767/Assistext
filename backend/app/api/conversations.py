# app/api/conversations.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .. import db
from ..models import User, Conversation, Message
from sqlalchemy import desc

conversations_bp = Blueprint('conversations', __name__)

@conversations_bp.route('/', methods=['GET'])
@jwt_required()
def get_conversations():
    """Get a paginated list of conversations for the current user."""
    current_user_id = get_jwt_identity()
    
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Sorting
    sort_by = request.args.get('sort_by', 'recent', type=str)
    
    # Filtering
    date_from = request.args.get('date_from')
    date_to = request.args.get('date_to')
    flagged = request.args.get('flagged', type=bool)

    query = Conversation.query.filter_by(user_id=current_user_id)

    # Apply filters
    if date_from:
        query = query.filter(Conversation.last_message_at >= date_from)
    if date_to:
        query = query.filter(Conversation.last_message_at <= date_to)
    if flagged is not None:
        query = query.filter(Conversation.flagged == flagged)

    # Apply sorting
    if sort_by == 'date':
        query = query.order_by(desc(Conversation.last_message_at))
    else: # Default sort: unread then recent
        query = query.order_by(desc(Conversation.unread), desc(Conversation.last_message_at))

    paginated_conversations = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'conversations': [c.to_dict() for c in paginated_conversations.items],
        'total': paginated_conversations.total,
        'pages': paginated_conversations.pages,
        'current_page': paginated_conversations.page
    }), 200

@conversations_bp.route('/<int:conversation_id>', methods=['GET'])
@jwt_required()
def get_conversation(conversation_id):
    """Get a single conversation with its messages."""
    current_user_id = get_jwt_identity()
    
    conversation = Conversation.query.filter_by(id=conversation_id, user_id=current_user_id).first_or_404()
    
    # Mark conversation as read
    if conversation.unread:
        conversation.unread = False
        db.session.commit()
        
    messages = Message.query.filter_by(conversation_id=conversation.id).order_by(Message.created_at.asc()).all()
    
    return jsonify({
        'conversation': conversation.to_dict(),
        'messages': [m.to_dict() for m in messages]
    }), 200
