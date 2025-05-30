// Deployment verification script for PRIMER-RKA
const https = require('https');
const http = require('http');

console.log('🔍 Checking PRIMER-RKA Deployment Status...\n');

// List of potential deployment URLs
const deploymentUrls = [
  'https://primer-ogn5jm91t-kallalmukherjeeksu.vercel.app',
  'https://primer-ksgfl2siw-kallalmukherjeeksu.vercel.app',
  'https://primer-rka.vercel.app',
  'https://primer-rka-kallalmukherjeeksu.vercel.app'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode === 200,
          data: data.substring(0, 200) + '...'
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function checkAllDeployments() {
  console.log('🌐 Checking deployment URLs...\n');
  
  for (const url of deploymentUrls) {
    console.log(`Checking: ${url}`);
    const result = await checkUrl(url);
    
    if (result.success) {
      console.log(`✅ LIVE: ${url}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Preview: ${result.data}\n`);
      
      // Check API endpoint
      const apiUrl = url + '/api';
      console.log(`Checking API: ${apiUrl}`);
      const apiResult = await checkUrl(apiUrl);
      
      if (apiResult.success) {
        console.log(`✅ API WORKING: ${apiUrl}`);
        console.log(`   Status: ${apiResult.status}`);
        console.log(`   Response: ${apiResult.data}\n`);
      } else {
        console.log(`❌ API FAILED: ${apiUrl}`);
        console.log(`   Error: ${apiResult.error || apiResult.status}\n`);
      }
      
      return { url, working: true };
    } else {
      console.log(`❌ FAILED: ${url}`);
      console.log(`   Error: ${result.error || result.status}\n`);
    }
  }
  
  return { url: null, working: false };
}

async function main() {
  const result = await checkAllDeployments();
  
  console.log('📋 Summary:');
  if (result.working) {
    console.log(`🎉 PRIMER-RKA is LIVE at: ${result.url}`);
    console.log('\n🔗 Live Links:');
    console.log(`   Frontend: ${result.url}`);
    console.log(`   API: ${result.url}/api`);
    console.log(`   Sign In: ${result.url}/sign-in`);
    console.log('\n✅ Deployment Status: SUCCESS');
  } else {
    console.log('❌ No working deployment found');
    console.log('\n📝 Next Steps:');
    console.log('1. Check Vercel dashboard for deployment status');
    console.log('2. Verify build completed successfully');
    console.log('3. Check environment variables are set');
    console.log('4. Try redeploying with: npx vercel --prod');
  }
  
  console.log('\n🔗 Repository: https://github.com/7908837174/PRIMER-RKA.git');
  console.log('👤 Author: Kallal');
}

main().catch(console.error);