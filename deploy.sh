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

echo "Deployment script completed" 