// Deployment Status Check for PRIMER-RKA
const fs = require('fs');
const path = require('path');

console.log('🚀 PRIMER-RKA Deployment Status Check\n');

// Check critical files
const criticalFiles = [
  { file: 'vercel.json', desc: 'Vercel configuration' },
  { file: 'package.json', desc: 'Root package.json' },
  { file: 'Backend1/package.json', desc: 'Backend package.json' },
  { file: 'client/package.json', desc: 'Client package.json' },
  { file: 'Backend1/.env', desc: 'Backend environment' },
  { file: 'client/.env', desc: 'Client environment' },
  { file: 'Backend1/api/index.js', desc: 'Vercel API entry point' }
];

console.log('📋 Critical Files Check:');
let allFilesOk = true;

criticalFiles.forEach(({ file, desc }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${desc} - Found`);
  } else {
    console.log(`❌ ${desc} - Missing: ${file}`);
    allFilesOk = false;
  }
});

// Check build directories
console.log('\n🏗️ Build Directories:');
const clientDist = path.join(__dirname, 'client', 'dist');
const backendDist = path.join(__dirname, 'Backend1', 'dist');

if (fs.existsSync(clientDist)) {
  console.log('✅ Client dist directory exists');
  const indexHtml = path.join(clientDist, 'index.html');
  if (fs.existsSync(indexHtml)) {
    console.log('✅ Client index.html exists');
  } else {
    console.log('⚠️  Client index.html missing (run build first)');
  }
} else {
  console.log('⚠️  Client dist directory missing (run build first)');
}

if (fs.existsSync(backendDist)) {
  console.log('✅ Backend dist directory exists');
} else {
  console.log('⚠️  Backend dist directory missing (run build first)');
}

// Check vercel.json configuration
console.log('\n⚙️ Vercel Configuration:');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  
  if (vercelConfig.buildCommand) {
    console.log(`✅ Build command: ${vercelConfig.buildCommand}`);
  }
  
  if (vercelConfig.outputDirectory) {
    console.log(`✅ Output directory: ${vercelConfig.outputDirectory}`);
  }
  
  if (vercelConfig.routes && vercelConfig.routes.length > 0) {
    console.log(`✅ Routes configured: ${vercelConfig.routes.length} routes`);
  }
  
} catch (error) {
  console.log('❌ Error reading vercel.json:', error.message);
  allFilesOk = false;
}

// Check environment variables
console.log('\n🔧 Environment Variables:');
try {
  const backendEnv = fs.readFileSync(path.join(__dirname, 'Backend1', '.env'), 'utf8');
  
  const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'BASE_PATH',
    'MONGO_URI',
    'SESSION_SECRET',
    'FRONTEND_ORIGIN'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (backendEnv.includes(`${envVar}=`)) {
      console.log(`✅ ${envVar} configured`);
    } else {
      console.log(`⚠️  ${envVar} missing`);
    }
  });
  
} catch (error) {
  console.log('❌ Error reading .env file:', error.message);
}

// Final status
console.log('\n📊 Deployment Readiness:');
if (allFilesOk) {
  console.log('🎉 All critical files present!');
  console.log('🚀 Ready for Vercel deployment!');
  console.log('\n📝 Next steps:');
  console.log('1. Push to GitHub (✅ Done)');
  console.log('2. Connect to Vercel or redeploy existing project');
  console.log('3. Set environment variables in Vercel dashboard');
  console.log('4. Deploy and test!');
} else {
  console.log('⚠️  Some issues found. Please fix before deploying.');
}

console.log('\n🔗 Repository: https://github.com/7908837174/PRIMER-RKA.git');
console.log('👤 Author: Kallal');
console.log('📚 Documentation: VERCEL_DEPLOYMENT_FIX.md');