https://github.com/7908837174/PRIMER-RKA.git# Deployment Guide for PRIMER

This guide provides instructions for deploying the PRIMER application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database
3. [Node.js](https://nodejs.org) (version 18 or higher)
4. [Git](https://git-scm.com)

## Step 1: Set Up MongoDB Atlas

1. Create a new MongoDB Atlas cluster if you don't have one already
2. Create a database user with read/write permissions
3. Configure network access to allow connections from anywhere (or specific IP addresses)
4. Get your MongoDB connection string

## Step 2: Deploy to Vercel

### Option 1: Deploy from the Vercel Dashboard

1. Push your code to GitHub using the provided scripts in the project
2. Log in to your Vercel account
3. Click "Add New" > "Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: client/dist
6. Add the following environment variables:
   - `NODE_ENV`: production
   - `PORT`: 8080
   - `BASE_PATH`: /api
   - `MONGO_URI`: your-mongodb-connection-string
   - `SESSION_SECRET`: a-random-secret-string
   - `SESSION_EXPIRES_IN`: 24h
   - `GOOGLE_CLIENT_ID`: your-google-client-id (if using Google OAuth)
   - `GOOGLE_CLIENT_SECRET`: your-google-client-secret (if using Google OAuth)
   - `GOOGLE_CALLBACK_URL`: https://your-vercel-domain.vercel.app/api/auth/google/callback
   - `FRONTEND_ORIGIN`: https://your-vercel-domain.vercel.app
   - `FRONTEND_GOOGLE_CALLBACK_URL`: https://your-vercel-domain.vercel.app/auth/google/callback
   - `VITE_API_BASE_URL`: https://your-vercel-domain.vercel.app/api
7. Click "Deploy"

### Option 2: Deploy with Vercel CLI

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
   vercel
   ```

4. Follow the prompts to configure your project
5. Add environment variables using the Vercel dashboard or CLI

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

## Separate Backend and Frontend Deployment (Alternative)

If you prefer to deploy the backend and frontend separately:

### Backend (Vercel)

1. Create a new project in Vercel for just the Backend1 directory
2. Set the root directory to "Backend1"
3. Configure environment variables as listed above
4. Deploy

### Frontend (Vercel)

1. Create a new project in Vercel for just the client directory
2. Set the root directory to "client"
3. Add the environment variable `VITE_API_BASE_URL` pointing to your backend URL
4. Deploy

Remember to update CORS settings in the backend to allow requests from your frontend domain.