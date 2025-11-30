#!/usr/bin/env python3
import sys
import os
import socket
import importlib.util

def check_python_version():
    print(f"Checking Python version... {sys.version.split()[0]}")
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is recommended.")
        return False
    print("✅ Python version OK")
    return True

def check_module(module_name):
    print(f"Checking for {module_name}...", end=" ")
    if importlib.util.find_spec(module_name) is None:
        print("❌ Not found")
        return False
    print("✅ Found")
    return True

def check_dependencies():
    required = ['flask', 'flask_socketio', 'gevent', 'gunicorn', 'dotenv']
    all_ok = True
    for req in required:
        if not check_module(req):
            all_ok = False
    return all_ok

def check_env_file():
    print("Checking for .env file...", end=" ")
    if os.path.exists('.env'):
        print("✅ Found")
        return True
    else:
        print("❌ Not found (Make sure you are in the backend directory)")
        return False

def check_port(port=5000):
    print(f"Checking if port {port} is free...", end=" ")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', port))
    sock.close()
    if result == 0:
        print(f"❌ Port {port} is already in use!")
        return False
    else:
        print(f"✅ Port {port} is free")
        return True

def check_wsgi_import():
    print("Checking if wsgi:application can be imported...", end=" ")
    try:
        sys.path.insert(0, os.getcwd())
        from wsgi import application
        print("✅ Imported successfully")
        return True
    except Exception as e:
        print(f"❌ Failed to import: {e}")
        return False

def main():
    print("--- Assistext Deployment Check ---")
    
    checks = [
        check_python_version(),
        check_env_file(),
        check_dependencies(),
        check_port(),
        check_wsgi_import()
    ]
    
    print("-" * 30)
    if all(checks):
        print("✅ Environment looks good for Gunicorn!")
        print("\nTry running manually:")
        print("gunicorn -c gunicorn_config.py wsgi:application")
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
