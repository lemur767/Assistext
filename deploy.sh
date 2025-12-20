#!/bin/bash
set -e

echo "Starting deployment..."

# 1. Pull the latest code
echo "Pulling latest changes from git..."
git pull origin main

# 2. Backend Setup
echo "Updating Backend..."
cd backend
if [ -d "venv" ]; then
    source venv/bin/activate
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
    echo "Running Database Migrations..."
    flask db upgrade
    deactivate
else
    echo "Error: 'venv' directory not found in backend. Please ensure the virtual environment is set up."
    exit 1
fi
cd ..

# 3. Restart Backend Service
echo "Restarting 'assistext-backend' service..."
# Assuming the service is named 'assistext-backend' based on the file in scripts/
sudo systemctl restart assistext-backend

# 4. Frontend Setup
echo "Updating Frontend..."
cd frontend
echo "Installing Node dependencies..."
npm install
echo "Building Frontend..."
npm run build
cd ..

# 5. Restart Nginx
echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Deployment Successfully Completed!"
