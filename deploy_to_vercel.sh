#!/bin/bash

echo "Deploying PRIMER to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "Vercel CLI not found. Installing..."
  npm install -g vercel
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"
echo "Visit your Vercel dashboard to check the deployment status and configure environment variables."