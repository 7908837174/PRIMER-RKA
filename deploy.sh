#!/bin/bash

# PRIMER-RKA Vercel Deployment Script
echo "Starting PRIMER-RKA Vercel Deployment..."

# Step 1: Build the backend
echo "Building the backend..."
cd Backend1
npm install
npm run build
cd ..

# Step 2: Build the frontend
echo "Building the frontend..."
cd client
npm install
npm run build
cd ..

# Step 3: Prepare for deployment
echo "Preparing for deployment..."
# Copy the .env.production to .env for Vercel
cp Backend1/.env.production Backend1/.env

# Step 4: Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete. Check the Vercel dashboard for details."
