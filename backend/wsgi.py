#!/usr/bin/env python3
"""
WSGI entry point for Flask application.
This file should be used for Flask CLI commands and production deployment.
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Import and create the application
from app import create_app

# Create the application instance
app, socketio = create_app()

# This is what Flask CLI will use
application = app

if __name__ == "__main__":
    # For development server
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    
    print(f"🚀 Starting development server...")
    print(f"🔗 Running on: http://{host}:{port}")
    
    socketio.run(app, host=host, port=port, debug=debug_mode)