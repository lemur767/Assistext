#!/bin/bash
set -e

echo "Starting deployment..."

# 1. Pull the latest code
echo "Pulling latest changes from git..."
git pull origin main



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
mv /opt/Assistext/frontend/dist /var/www/assistext

# 5. Restart Nginx
echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Deployment Successfully Completed!"
