#!/bin/bash

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
export NODE_ENV=development
npm install

# Run build
echo "Running build..."
export NODE_ENV=production
npm run build

# Verify build output
echo "Verifying build output..."
if [ -d "dist/public" ]; then
  echo "✓ Build successful - dist/public directory exists"
  ls -la dist/public/
else
  echo "✗ Build failed - dist/public directory not found"
  ls -la dist/ || echo "dist directory not found"
  exit 1
fi

echo "Deployment script completed" 