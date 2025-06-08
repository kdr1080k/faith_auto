#!/bin/bash
export NODE_ENV=production
export PORT=${PORT:-8080}
node dist/index.js 