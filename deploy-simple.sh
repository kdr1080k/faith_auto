#!/bin/bash

echo "🚀 Starting simple deployment process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install only production dependencies
echo "📦 Installing production dependencies..."
npm ci --omit=dev --omit=optional --no-audit --no-fund --prefer-offline

# Build the application
echo "🔨 Building application..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    echo "❌ Build failed: dist/index.js not found"
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "❌ Build failed: dist/public directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output:"
ls -la dist/
ls -la dist/public/

echo "🎉 Deployment package ready!" 