"""add include_ai_signature to user model

Revision ID: 6b23cc93b785
Revises: 8e2e0a0da9a0
Create Date: 2025-10-09 19:18:59.136765

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b23cc93b785'
down_revision = '8e2e0a0da9a0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('include_ai_signature', sa.Boolean(), server_default=sa.text('false'), nullable=False))


def downgrade():
    op.drop_column('users', 'include_ai_signature')
