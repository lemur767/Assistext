import os
import multiprocessing

# Gunicorn configuration file
# https://docs.gunicorn.org/en/stable/configure.html#configuration-file

# Bind to localhost on port 5000
bind = "127.0.0.1:5000"

# Worker Options
# Using eventlet for Flask-SocketIO support
worker_class = "eventlet"
workers = 1  # Start with 1 worker for SocketIO to avoid session issues unless using Redis/MessageQueue
# If you scale workers, ensure you have a message queue configured for SocketIO

# Timeout
timeout = 120

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# Process Name
proc_name = "assistext-backend"
