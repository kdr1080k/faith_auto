#!/bin/bash
echo "Starting Faith Auto application..."
cd /home/site/wwwroot
export NODE_ENV=production
export PORT=${PORT:-8080}
node dist/index.js 