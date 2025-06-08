#!/bin/bash

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
npm install

# Run build
echo "Running build..."
npm run build

echo "Deployment script completed" 