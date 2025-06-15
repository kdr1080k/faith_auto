#!/bin/bash

echo "🔧 Starting build process..."

# Clean previous builds and dependencies
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/
rm -f package-lock.json

# Install dependencies with optional dependencies included
echo "📦 Installing dependencies..."
npm ci --include=optional

# Rebuild native dependencies
echo "🔨 Rebuilding native dependencies..."
npm rebuild

# Build the application
echo "🏗️ Building application..."
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

echo "🎉 Build package ready!" 