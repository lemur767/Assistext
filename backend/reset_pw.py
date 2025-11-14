import os
import sys
import secrets
import string
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash

  # --- Configuration ---
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:plmnko1423@localhost:5432/Assist_Dev')
USER_ID_TO_RESET = 3  # <--- This is set to user_id 3

  # --- Model Definition (simplified from your project) ---
Base = declarative_base()

class User(Base):
      __tablename__ = 'users'
      id = Column(Integer, primary_key=True)
      email = Column(String(255), unique=True, nullable=False, index=True)
      password_hash = Column(String(255), nullable=False)

  # --- Helper Function ---
def generate_random_password(length=16):
      """Generates a secure random password."""
      alphabet = string.ascii_letters + string.digits + string.punctuation
      # Ensure the password has at least one of each character type
      while True:
          password = ''.join(secrets.choice(alphabet) for i in range(length))
          if (any(c.islower() for c in password)
                  and any(c.isupper() for c in password)
                  and any(c.isdigit() for c in password)
                  and any(c in string.punctuation for c in password)):
              break
      return password

  # --- Main Script ---
def reset_password(user_id, new_password=None):
      """Resets the password for a given user ID."""
      engine = create_engine(DATABASE_URL)
      Session = sessionmaker(bind=engine)
      session = Session()

      try:
          user = session.query(User).filter_by(id=user_id).first()

          if not user:
              print(f"Error: User with ID {user_id} not found.")
              return

          if not new_password:
              new_password = generate_random_password()

          # Hash the new password
          new_password_hash = generate_password_hash(new_password)

          # Update the user's password hash
          user.password_hash = new_password_hash
          session.commit()

          print(f"Successfully reset password for user {user.email} (ID: {user.id}).")
          print(f"New password: {new_password}")

      except Exception as e:
          session.rollback()
          print(f"An error occurred: {e}")
      finally:
          session.close()

if __name__ == "__main__":
      # This script will reset the password for the user ID set in USER_ID_TO_RESET
      reset_password(USER_ID_TO_RESET)