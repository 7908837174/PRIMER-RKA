#!/usr/bin/env node

// Create a working deployment for PRIMER-RKA
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Creating Working PRIMER-RKA Deployment...\n');

async function createWorkingDeployment() {
  try {
    // Step 1: Clean and prepare
    console.log('🧹 Cleaning previous builds...');
    const clientDist = path.join(__dirname, 'client', 'dist');
    const backendDist = path.join(__dirname, 'Backend1', 'dist');
    
    if (fs.existsSync(clientDist)) {
      fs.rmSync(clientDist, { recursive: true, force: true });
    }
    if (fs.existsSync(backendDist)) {
      fs.rmSync(backendDist, { recursive: true, force: true });
    }
    console.log('✅ Cleaned previous builds\n');

    // Step 2: Install dependencies
    console.log('📦 Installing fresh dependencies...');
    execSync('npm run install:all', { stdio: 'inherit' });
    console.log('✅ Dependencies installed\n');

    // Step 3: Build client
    console.log('🏗️ Building client application...');
    execSync('npm run build:client', { stdio: 'inherit' });
    
    // Verify client build
    if (!fs.existsSync(clientDist) || !fs.existsSync(path.join(clientDist, 'index.html'))) {
      throw new Error('Client build failed - dist directory or index.html not found');
    }
    console.log('✅ Client build successful\n');

    // Step 4: Build backend
    console.log('🏗️ Building backend application...');
    execSync('npm run build:backend', { stdio: 'inherit' });
    console.log('✅ Backend build successful\n');

    // Step 5: Commit changes
    console.log('📝 Committing changes...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Fix deployment configuration for working live link"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Changes committed and pushed\n');

    // Step 6: Deploy to Vercel
    console.log('🌐 Deploying to Vercel...');
    console.log('This will create a new working deployment URL...\n');
    
    const deployResult = execSync('npx vercel --prod --yes', { encoding: 'utf8' });
    console.log(deployResult);
    
    // Extract URL from deploy result
    const urlMatch = deployResult.match(/https:\/\/[^\s]+\.vercel\.app/);
    if (urlMatch) {
      const deploymentUrl = urlMatch[0];
      console.log('\n🎉 DEPLOYMENT SUCCESSFUL!');
      console.log(`\n🔗 LIVE WORKING LINK: ${deploymentUrl}`);
      console.log(`\n📋 Test URLs:`);
      console.log(`   Frontend: ${deploymentUrl}`);
      console.log(`   API: ${deploymentUrl}/api`);
      console.log(`   Sign In: ${deploymentUrl}/sign-in`);
      
      // Create a file with the working URL
      fs.writeFileSync(
        path.join(__dirname, 'WORKING_LIVE_LINK.txt'),
        `PRIMER-RKA Live Working Link:\n${deploymentUrl}\n\nAPI Endpoint:\n${deploymentUrl}/api\n\nSign In Page:\n${deploymentUrl}/sign-in\n\nDeployed by: Kallal\nRepository: https://github.com/7908837174/PRIMER-RKA.git\nDate: ${new Date().toISOString()}`
      );
      
      return deploymentUrl;
    } else {
      throw new Error('Could not extract deployment URL from Vercel output');
    }

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    console.log('\n🔧 Trying alternative deployment method...');
    
    try {
      // Alternative: Deploy without --yes flag
      const altResult = execSync('npx vercel --prod', { encoding: 'utf8' });
      console.log(altResult);
      
      const altUrlMatch = altResult.match(/https:\/\/[^\s]+\.vercel\.app/);
      if (altUrlMatch) {
        const deploymentUrl = altUrlMatch[0];
        console.log('\n🎉 ALTERNATIVE DEPLOYMENT SUCCESSFUL!');
        console.log(`\n🔗 LIVE WORKING LINK: ${deploymentUrl}`);
        return deploymentUrl;
      }
    } catch (altError) {
      console.error('\n❌ Alternative deployment also failed:', altError.message);
    }
    
    throw error;
  }
}

// Run the deployment
createWorkingDeployment()
  .then((url) => {
    console.log('\n✅ DEPLOYMENT COMPLETED SUCCESSFULLY!');
    console.log(`\n🌟 Your PRIMER-RKA application is now live at: ${url}`);
    console.log('\n📝 Next steps:');
    console.log('1. Test the live link to ensure it works');
    console.log('2. Set up environment variables in Vercel dashboard if needed');
    console.log('3. Configure MongoDB connection for full functionality');
  })
  .catch((error) => {
    console.error('\n💥 DEPLOYMENT FAILED COMPLETELY');
    console.log('\n🆘 Manual deployment required:');
    console.log('1. Go to https://vercel.com/dashboard');
    console.log('2. Import GitHub repository: https://github.com/7908837174/PRIMER-RKA.git');
    console.log('3. Configure build settings manually');
    console.log('4. Deploy from Vercel dashboard');
    process.exit(1);
  });