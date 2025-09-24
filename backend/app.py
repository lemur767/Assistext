# app.py - Main Entry Point
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import the application factory and socketio instance
from app import create_app, socketio

# Create the Flask application and get the socketio instance
app, socketio_instance = create_app()

if __name__ == '__main__':
    # Development server configuration
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    
    print(f"🚀 Starting Assistext API server with Socket.IO...")
    print(f"📍 Environment: {os.getenv('ENVIRONMENT', 'development')}")
    print(f"🔗 Running on: http://{host}:{port}")
    print(f"🐛 Debug mode: {debug_mode}")
    
    # Run the development server with Socket.IO support
    socketio_instance.run(
        app,
        host=host,
        port=port,
        debug=debug_mode,
    )
    