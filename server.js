// Simple fallback server for Azure
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting application...');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '8080';

// Start the actual server
const serverPath = path.join(__dirname, 'dist', 'index.js');
console.log('Attempting to start:', serverPath);

const child = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
}); 