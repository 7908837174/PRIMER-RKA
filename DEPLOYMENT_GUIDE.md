# PRIMER Deployment Guide

This guide provides step-by-step instructions for deploying the PRIMER application to Vercel.

## Prerequisites

1. Node.js (version 18 or higher)
2. Git
3. A Vercel account
4. MongoDB Atlas account (for database)

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. Clone the repository:
   ```
   git clone https://github.com/7908837174/PRIMER-RKA.git
   cd PRIMER-RKA
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the deployment script:
   ```
   npm run deploy
   ```

4. Follow the prompts from the Vercel CLI to complete the deployment.

5. Once deployed, configure the following environment variables in the Vercel dashboard:
   - `NODE_ENV`: production
   - `PORT`: 8080
   - `BASE_PATH`: /api
   - `MONGO_URI`: your-mongodb-connection-string
   - `SESSION_SECRET`: your-secret-key
   - `SESSION_EXPIRES_IN`: 24h
   - `FRONTEND_ORIGIN`: https://your-vercel-domain.vercel.app
   - `VITE_API_BASE_URL`: /api

### Option 2: Manual Deployment

1. Clone the repository:
   ```
   git clone https://github.com/7908837174/PRIMER-RKA.git
   cd PRIMER-RKA
   ```

2. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Deploy to Vercel:
   ```
   vercel --prod
   ```

4. Follow the prompts to complete the deployment.

5. Configure environment variables as described in Option 1.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel deployment logs for specific error messages.
2. Verify that all environment variables are correctly set.
3. Make sure your MongoDB Atlas cluster is properly configured and accessible.
4. Check that the build commands in package.json are correct.

## Local Development

To run the project locally:

1. Install dependencies:
   ```
   npm run install:all
   ```

2. Create `.env` files in both the `Backend1` and `client` directories using the provided `.env.example` files.

3. Start the development servers:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:5173`