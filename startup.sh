#!/bin/bash
echo "=== Faith Auto Application Startup ==="
echo "Timestamp: $(date)"
echo "Working Directory: $(pwd)"
echo "Node Version: $(node --version)"
echo "Environment: ${NODE_ENV:-development}"
echo "Azure Port: $PORT"
echo "Process ID: $$"

cd /home/site/wwwroot
export NODE_ENV=production

# Azure assigns the port via environment variable
if [ -z "$PORT" ]; then
    export PORT=8080
    echo "Warning: No PORT environment variable set, using default 8080"
else
    echo "Using Azure assigned port: $PORT"
fi

echo "=== Checking build files ==="
if [ -f "dist/index.js" ]; then
    echo "✅ Backend build found: dist/index.js"
else
    echo "❌ Backend build not found: dist/index.js"
    ls -la dist/ || echo "dist directory not found"
    exit 1
fi

if [ -d "dist/public" ]; then
    echo "✅ Frontend build found: dist/public"
    echo "Frontend files: $(ls -la dist/public/ | wc -l) items"
else
    echo "❌ Frontend build not found: dist/public"
    ls -la dist/ || echo "dist directory not found"
    exit 1
fi

echo "=== Starting application ==="
echo "Application will be available on port: $PORT"
echo "Health check will be at: /api/health"
echo "Starting Node.js process..."

# Start the application
exec node dist/index.js 