#!/usr/bin/env node

// Live deployment script for PRIMER-RKA
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 PRIMER-RKA Live Deployment Script\n');

try {
  // Step 1: Ensure we're in the right directory
  console.log('📁 Checking project structure...');
  const requiredFiles = ['package.json', 'vercel.json', 'Backend1', 'client'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      throw new Error(`Required file/directory missing: ${file}`);
    }
  }
  console.log('✅ Project structure verified\n');

  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm run install:all', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');

  // Step 3: Build the project
  console.log('🏗️ Building project...');
  execSync('npm run build:client', { stdio: 'inherit' });
  console.log('✅ Build completed\n');

  // Step 4: Verify build output
  console.log('🔍 Verifying build output...');
  const distPath = path.join(__dirname, 'client', 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('Build failed: dist directory not found');
  }
  
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('Build failed: index.html not found');
  }
  console.log('✅ Build output verified\n');

  // Step 5: Deploy to Vercel
  console.log('🌐 Deploying to Vercel...');
  console.log('Note: You may need to authenticate with Vercel if not already logged in.\n');
  
  try {
    execSync('npx vercel --prod --yes', { stdio: 'inherit' });
    console.log('\n🎉 Deployment completed successfully!');
  } catch (deployError) {
    console.log('\n⚠️ Deployment may have failed. Trying alternative method...');
    
    // Try without --yes flag
    execSync('npx vercel --prod', { stdio: 'inherit' });
    console.log('\n🎉 Deployment completed!');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Check the deployment URL provided by Vercel');
  console.log('2. Set environment variables in Vercel dashboard');
  console.log('3. Test the live application');
  console.log('\n🔗 Repository: https://github.com/7908837174/PRIMER-RKA.git');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure you have Vercel CLI installed: npm i -g vercel');
  console.log('2. Login to Vercel: npx vercel login');
  console.log('3. Check your internet connection');
  console.log('4. Verify all files are committed to Git');
  process.exit(1);
}