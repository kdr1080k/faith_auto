#!/bin/bash
echo "Starting Faith Auto app..."
echo "Node version: $(node --version)"
echo "Current directory: $(pwd)"
echo "PORT: $PORT"

# Set required environment variables
export NODE_ENV=production
export PORT=${PORT:-8080}

# Change to the correct directory
cd /home/site/wwwroot

# Check if the app file exists
if [ -f "dist/index.js" ]; then
    echo "Found app file: dist/index.js"
    echo "Starting the application on port $PORT"
    node dist/index.js
else
    echo "ERROR: dist/index.js not found!"
    echo "Contents of current directory:"
    ls -la
    echo "Contents of dist directory:"
    ls -la dist/ 2>/dev/null || echo "dist directory not found"
    exit 1
fi 