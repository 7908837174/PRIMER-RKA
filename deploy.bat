@echo off
echo Deploying PRIMER to Vercel...

echo Installing Vercel CLI...
call npm install -g vercel

echo Deploying to Vercel...
call vercel --prod

echo Deployment process completed!
echo Please check the Vercel dashboard for deployment status and configure environment variables.