#!/usr/bin/env node

// Deploy PRIMER-RKA to Netlify
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying PRIMER-RKA to Netlify...\n');

async function deployToNetlify() {
  try {
    // Step 1: Ensure build is ready
    console.log('🏗️ Ensuring build is ready...');
    const clientDist = path.join(__dirname, 'client', 'dist');
    
    if (!fs.existsSync(clientDist)) {
      console.log('Building client...');
      execSync('npm run build:client', { stdio: 'inherit' });
    }
    
    if (!fs.existsSync(path.join(clientDist, 'index.html'))) {
      throw new Error('Build failed - index.html not found');
    }
    console.log('✅ Build verified\n');

    // Step 2: Install Netlify CLI if not available
    console.log('📦 Checking Netlify CLI...');
    try {
      execSync('npx netlify --version', { stdio: 'pipe' });
      console.log('✅ Netlify CLI available\n');
    } catch (error) {
      console.log('Installing Netlify CLI...');
      execSync('npm install -g netlify-cli', { stdio: 'inherit' });
      console.log('✅ Netlify CLI installed\n');
    }

    // Step 3: Deploy to Netlify
    console.log('🌐 Deploying to Netlify...');
    console.log('Note: You may need to authenticate with Netlify if not already logged in.\n');
    
    // Deploy the client/dist directory
    const deployResult = execSync(
      `npx netlify deploy --prod --dir=client/dist --message="PRIMER-RKA Live Deployment by Kallal"`,
      { encoding: 'utf8', cwd: __dirname }
    );
    
    console.log(deployResult);
    
    // Extract URL from deploy result
    const urlMatch = deployResult.match(/Website URL:\s*(https:\/\/[^\s]+)/);
    if (urlMatch) {
      const deploymentUrl = urlMatch[1];
      console.log('\n🎉 NETLIFY DEPLOYMENT SUCCESSFUL!');
      console.log(`\n🔗 LIVE WORKING LINK: ${deploymentUrl}`);
      console.log(`\n📋 Test URLs:`);
      console.log(`   Frontend: ${deploymentUrl}`);
      console.log(`   Sign In: ${deploymentUrl}/sign-in`);
      
      // Create a file with the working URL
      fs.writeFileSync(
        path.join(__dirname, 'NETLIFY_LIVE_LINK.txt'),
        `PRIMER-RKA Live Working Link (Netlify):\n${deploymentUrl}\n\nSign In Page:\n${deploymentUrl}/sign-in\n\nDeployed by: Kallal\nRepository: https://github.com/7908837174/PRIMER-RKA.git\nPlatform: Netlify\nDate: ${new Date().toISOString()}`
      );
      
      return deploymentUrl;
    } else {
      throw new Error('Could not extract deployment URL from Netlify output');
    }

  } catch (error) {
    console.error('\n❌ Netlify deployment failed:', error.message);
    console.log('\n🔧 Manual Netlify deployment:');
    console.log('1. Go to https://netlify.com');
    console.log('2. Drag and drop the client/dist folder');
    console.log('3. Or connect GitHub repository manually');
    throw error;
  }
}

// Run the deployment
deployToNetlify()
  .then((url) => {
    console.log('\n✅ NETLIFY DEPLOYMENT COMPLETED SUCCESSFULLY!');
    console.log(`\n🌟 Your PRIMER-RKA application is now live at: ${url}`);
    console.log('\n📝 Next steps:');
    console.log('1. Test the live link to ensure it works');
    console.log('2. The frontend is now live and working');
    console.log('3. For full functionality, set up backend on Railway or Render');
  })
  .catch((error) => {
    console.error('\n💥 NETLIFY DEPLOYMENT FAILED');
    console.log('\n🆘 Alternative options:');
    console.log('1. Use the one-click deploy buttons in ALTERNATIVE_DEPLOYMENT.md');
    console.log('2. Manual deployment via platform dashboards');
    console.log('3. Wait 18 hours and try Vercel again');
    process.exit(1);
  });