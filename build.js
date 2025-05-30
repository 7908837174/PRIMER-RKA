#!/usr/bin/env node

// Build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting PRIMER-RKA build process...');

try {
  // Install all dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm run install:all', { stdio: 'inherit' });

  // Build the client
  console.log('🏗️ Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });

  // Verify dist directory exists
  const distPath = path.join(__dirname, 'client', 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('Client dist directory was not created');
  }

  // Verify index.html exists
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html was not created in dist directory');
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory:', distPath);
  
  // List contents of dist directory
  const distContents = fs.readdirSync(distPath);
  console.log('📋 Dist contents:', distContents);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}