# PRIMER Deployment Instructions

## Quick Deployment to Vercel

Follow these steps to deploy the PRIMER application to Vercel:

1. **Push your code to GitHub**
   - Use the provided scripts in the project root to push your code to GitHub
   - For example: `./push_to_github.bat` or `./push_to_github.sh`

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Other
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: client/dist
   - Add the following environment variables:
     ```
     NODE_ENV=production
     PORT=8080
     BASE_PATH=/api
     MONGO_URI=your-mongodb-connection-string
     SESSION_SECRET=your-secret-key
     SESSION_EXPIRES_IN=24h
     FRONTEND_ORIGIN=https://your-vercel-domain.vercel.app
     VITE_API_BASE_URL=/api
     ```
   - Click "Deploy"

3. **Verify Deployment**
   - Once deployed, visit your Vercel domain to verify the frontend is working
   - Test the API by visiting `https://your-vercel-domain.vercel.app/api`

## Fixing Common Deployment Issues

### MongoDB Connection

If you're having issues connecting to MongoDB:

1. Make sure your MongoDB Atlas cluster is properly configured
2. Verify that your connection string is correct
3. Ensure that your MongoDB Atlas cluster allows connections from Vercel's IP addresses

### Environment Variables

Make sure all required environment variables are set in the Vercel dashboard:

- `NODE_ENV`: production
- `PORT`: 8080
- `BASE_PATH`: /api
- `MONGO_URI`: your-mongodb-connection-string
- `SESSION_SECRET`: your-secret-key
- `SESSION_EXPIRES_IN`: 24h
- `FRONTEND_ORIGIN`: https://your-vercel-domain.vercel.app
- `VITE_API_BASE_URL`: /api

### CORS Issues

If you're experiencing CORS issues:

1. Make sure the `FRONTEND_ORIGIN` environment variable is set correctly
2. Verify that the backend's CORS configuration allows requests from your frontend domain

### Build Errors

If you encounter build errors:

1. Check the Vercel deployment logs for specific error messages
2. Make sure all dependencies are properly installed
3. Verify that your build commands are correct

## Local Development

To run the project locally:

1. Install dependencies:
   ```
   npm run install:all
   ```

2. Create `.env` files in both the `Backend1` and `client` directories using the provided `.env.example` files

3. Start the development servers:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:5173`

## Need Help?

If you're still experiencing deployment issues, check the detailed deployment guide in `DEPLOYMENT.md` or reach out to the project maintainers for assistance.