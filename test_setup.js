// Simple test script to verify project setup
const fs = require('fs');
const path = require('path');

console.log('🚀 Testing PRIMER-RKA Project Setup...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'Backend1/package.json',
  'client/package.json',
  'Backend1/.env',
  'client/.env',
  'Backend1/src/index.ts',
  'client/src/main.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

console.log('\n📦 Checking node_modules...');

// Check if node_modules exist
const backendNodeModules = path.join(__dirname, 'Backend1', 'node_modules');
const clientNodeModules = path.join(__dirname, 'client', 'node_modules');

if (fs.existsSync(backendNodeModules)) {
  console.log('✅ Backend dependencies installed');
} else {
  console.log('❌ Backend dependencies missing');
  allFilesExist = false;
}

if (fs.existsSync(clientNodeModules)) {
  console.log('✅ Client dependencies installed');
} else {
  console.log('❌ Client dependencies missing');
  allFilesExist = false;
}

console.log('\n🔧 Environment Configuration:');

// Check environment variables
try {
  const backendEnv = fs.readFileSync(path.join(__dirname, 'Backend1', '.env'), 'utf8');
  const clientEnv = fs.readFileSync(path.join(__dirname, 'client', '.env'), 'utf8');
  
  console.log('✅ Backend .env configured');
  console.log('✅ Client .env configured');
  
  // Check if MongoDB URI is set
  if (backendEnv.includes('MONGO_URI=')) {
    console.log('✅ MongoDB URI configured');
  } else {
    console.log('⚠️  MongoDB URI not configured');
  }
  
} catch (error) {
  console.log('❌ Environment files not readable');
  allFilesExist = false;
}

console.log('\n📋 Summary:');
if (allFilesExist) {
  console.log('🎉 Project setup is complete!');
  console.log('📝 Next steps:');
  console.log('   1. Set up MongoDB Atlas or local MongoDB');
  console.log('   2. Update MONGO_URI in Backend1/.env');
  console.log('   3. Run: npm run dev');
  console.log('   4. Open http://localhost:5173 in your browser');
} else {
  console.log('⚠️  Project setup incomplete. Please check missing files.');
}

console.log('\n🔗 GitHub Repository: https://github.com/7908837174/PRIMER-RKA.git');
console.log('👤 Author: Kallal');
console.log('📧 For support, check the AUTH_FIX_README.md file');