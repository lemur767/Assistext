import os
from app import create_app, db

# Set an environment variable to indicate this is a one-off script
# This can prevent things like the scheduler from starting if you want
os.environ['FLASK_RUN_FROM_CLI'] = 'true'

app, _ = create_app()

with app.app_context():
    print("Dropping all database tables...")
    db.drop_all()
    print("Tables dropped.")
    
    print("Creating all database tables...")
    db.create_all()
    print("Tables created successfully.")
    
    print("\nDatabase has been reset.")

