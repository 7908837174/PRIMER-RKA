// Build verification script for PRIMER-RKA
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Testing PRIMER-RKA Build Process...\n');

try {
  // Test client build
  console.log('📦 Building client...');
  execSync('npm run build:client', { stdio: 'inherit', cwd: __dirname });
  
  // Check if dist directory was created
  const distPath = path.join(__dirname, 'client', 'dist');
  if (fs.existsSync(distPath)) {
    console.log('✅ Client dist directory created successfully');
    
    // Check for index.html
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('✅ index.html found in dist directory');
    } else {
      console.log('❌ index.html not found in dist directory');
    }
    
    // List contents of dist directory
    const distContents = fs.readdirSync(distPath);
    console.log('�� Dist directory contents:', distContents);
    
  } else {
    console.log('❌ Client dist directory not created');
  }
  
  // Test backend build
  console.log('\n📦 Building backend...');
  execSync('npm run build:backend', { stdio: 'inherit', cwd: __dirname });
  
  // Check if backend dist was created
  const backendDistPath = path.join(__dirname, 'Backend1', 'dist');
  if (fs.existsSync(backendDistPath)) {
    console.log('✅ Backend dist directory created successfully');
  } else {
    console.log('❌ Backend dist directory not created');
  }
  
  console.log('\n🎉 Build test completed!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}