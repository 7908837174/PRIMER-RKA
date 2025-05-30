# Deploy PRIMER to Vercel

Click the button below to deploy PRIMER directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F7908837174%2FPRIMER-RKA&env=NODE_ENV,PORT,BASE_PATH,MONGO_URI,SESSION_SECRET,SESSION_EXPIRES_IN,FRONTEND_ORIGIN,VITE_API_BASE_URL&envDescription=Environment%20variables%20needed%20for%20PRIMER&envLink=https%3A%2F%2Fgithub.com%2F7908837174%2FPRIMER-RKA%2Fblob%2Fmain%2FDEPLOYMENT_GUIDE.md&project-name=primer-rka&repository-name=primer-rka)

## Environment Variables

When deploying, you'll need to set the following environment variables:

- `NODE_ENV`: Set to `production`
- `PORT`: Set to `8080`
- `BASE_PATH`: Set to `/api`
- `MONGO_URI`: Your MongoDB connection string
- `SESSION_SECRET`: A random string for session encryption
- `SESSION_EXPIRES_IN`: Set to `24h`
- `FRONTEND_ORIGIN`: The URL of your deployed frontend (will be set automatically)
- `VITE_API_BASE_URL`: Set to `/api`

## After Deployment

1. Check the deployment logs for any errors
2. Verify that both the frontend and backend are working correctly
3. Test the authentication and other features

For more detailed instructions, see the [Deployment Guide](DEPLOYMENT_GUIDE.md).