# Step-by-Step Vercel Deployment Guide

This guide provides detailed instructions for deploying the PRIMER application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database
3. [Node.js](https://nodejs.org) (version 18 or higher)
4. [Git](https://git-scm.com)

## Step 1: Prepare Your MongoDB Database

1. Create a MongoDB Atlas cluster if you don't have one already
2. Create a database user with read/write permissions
3. Configure network access to allow connections from anywhere (or specific IP addresses)
4. Get your MongoDB connection string

## Step 2: Deploy to Vercel

### Option 1: Deploy from the Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New" > "Project"
3. Import your GitHub repository: https://github.com/7908837174/PRIMER-RKA
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
5. Add the following environment variables:
   - `NODE_ENV`: production
   - `PORT`: 8080
   - `BASE_PATH`: /api
   - `MONGO_URI`: your-mongodb-connection-string
   - `SESSION_SECRET`: a-random-secret-string
   - `SESSION_EXPIRES_IN`: 24h
   - `FRONTEND_ORIGIN`: https://your-vercel-domain.vercel.app
   - `VITE_API_BASE_URL`: /api
6. Click "Deploy"

### Option 2: Deploy with One-Click Button

1. Go to the [PRIMER GitHub repository](https://github.com/7908837174/PRIMER-RKA)
2. Click the "Deploy with Vercel" button in the README
3. Follow the prompts to configure your project
4. Add the required environment variables
5. Click "Deploy"

### Option 3: Deploy with Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Navigate to your project directory and run:
   ```
   vercel --prod
   ```

4. Follow the prompts to configure your project
5. Add environment variables using the Vercel dashboard

## Step 3: Verify Deployment

1. Once deployed, visit your Vercel domain to verify the frontend is working
2. Test the API by visiting `https://your-vercel-domain.vercel.app/api`
3. Test authentication and other features

## Troubleshooting

If you encounter issues during deployment:

1. Check the Vercel deployment logs for errors
2. Verify all environment variables are set correctly
3. Make sure your MongoDB Atlas cluster is accessible from Vercel
4. Check that the build commands are executing correctly

## Common Issues and Solutions

### Issue: Build fails with package.json errors
Solution: Make sure your package.json files are valid JSON without any syntax errors.

### Issue: MongoDB connection fails
Solution: Verify your MongoDB connection string and make sure your IP whitelist includes Vercel's IPs or is set to allow all IPs.

### Issue: Frontend can't connect to backend
Solution: Make sure the VITE_API_BASE_URL environment variable is set correctly to "/api".

### Issue: Authentication doesn't work
Solution: Check that SESSION_SECRET is set and that FRONTEND_ORIGIN points to your Vercel domain.

## Need More Help?

If you're still experiencing issues, you can:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Open an issue on the [PRIMER GitHub repository](https://github.com/7908837174/PRIMER-RKA/issues)
3. Contact the PRIMER team for support