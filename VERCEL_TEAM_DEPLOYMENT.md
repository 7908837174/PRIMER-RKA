# Working with the Team's Vercel Deployment

This guide provides information on how to work with the team's Vercel deployment at https://primer-rka-d5zb.vercel.app/.

## Local Development

1. **Start the frontend locally**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

2. **Start the backend locally**:
   ```bash
   cd Backend1
   npm install
   npm run dev
   ```

3. **Testing with the deployed frontend**:
   - Uncomment the line in `.env` that sets `FRONTEND_ORIGIN=https://primer-rka-d5zb.vercel.app`
   - Comment out the local `FRONTEND_ORIGIN=http://localhost:5173`
   - Restart the backend server

## Deployment

When your team member needs to update the Vercel deployment:

1. **Push your changes to GitHub**
   - Use the provided scripts in the project root

2. **Update environment variables in Vercel**
   - Make sure all required environment variables are properly set:
     - `NODE_ENV=production`
     - `PORT=8080`
     - `BASE_PATH=/api`
     - `MONGO_URI` (must be a valid MongoDB connection string)
     - `SESSION_SECRET` (use a strong secret)
     - `SESSION_EXPIRES_IN=24h`
     - `FRONTEND_ORIGIN=https://primer-rka-d5zb.vercel.app`
     - `VITE_API_BASE_URL=/api` (for the frontend)

3. **Redeploy the application**
   - Trigger a new deployment from the Vercel dashboard
   - Or push to the connected GitHub repository to auto-deploy

## Troubleshooting

If you're experiencing connection issues between the frontend and backend:

1. **Check CORS settings**
   - Verify that the deployed backend allows the frontend domain
   - The current configuration allows requests from `https://primer-rka-d5zb.vercel.app`

2. **Check API requests**
   - Make sure all API requests use the correct base path (`/api`)
   - Verify that credentials are sent with requests

3. **MongoDB Connection Issues**
   - Make sure your MongoDB connection string is valid
   - For local development, you can use MongoDB locally with: `mongodb://localhost:27017/primer-db`
   - For MongoDB Atlas, use a connection string like: `mongodb+srv://username:password@cluster0.example.mongodb.net/primer-db?retryWrites=true&w=majority`
   - If using MongoDB Atlas, ensure your IP address is allowed in the Network Access settings

4. **Check environment variables**
   - Ensure all necessary environment variables are set correctly in Vercel
   - Check that sensitive information is properly configured

5. **Check for errors in the browser console**
   - Look for CORS or connection errors

## Viewing Logs

To diagnose issues with the deployed application:

1. Use the Vercel dashboard to view logs
2. Check both function logs (backend) and build logs (frontend)
