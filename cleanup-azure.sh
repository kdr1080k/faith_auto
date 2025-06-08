#!/bin/bash

echo "Starting cleanup process..."

# Remove development dependencies
echo "Removing dev dependencies..."
npm prune --production

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Remove unnecessary build files
echo "Removing build artifacts..."
rm -rf .next
rm -rf .nuxt
rm -rf .vite
rm -rf dist/public/*.map
rm -rf node_modules/.cache
rm -rf node_modules/.vite

# Remove any temp files
echo "Removing temporary files..."
find . -type f -name "*.log" -delete
find . -type f -name "*.tmp" -delete
find . -type d -name "temp" -exec rm -rf {} +
find . -type d -name ".git" -exec rm -rf {} +

# Remove source maps in production
echo "Removing source maps..."
find . -name "*.map" -type f -delete

# Clean up old deployments if they exist
echo "Cleaning up old deployments..."
rm -rf /home/site/deployments/tools
rm -rf /home/site/deployments/functions

# Display current disk usage
echo "Current disk usage:"
du -sh /home/site/wwwroot/*

echo "Cleanup completed!" 