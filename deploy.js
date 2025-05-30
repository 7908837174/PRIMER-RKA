// Simple deployment script for Vercel
const { execSync } = require('child_process');

console.log('Starting deployment process...');

try {
  // Install dependencies if needed
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Deploy to Vercel
  console.log('Deploying to Vercel...');
  execSync('npx vercel --prod', { stdio: 'inherit' });

  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}