@echo off
echo Deploying PRIMER to Vercel...

:: Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
  echo Vercel CLI not found. Installing...
  npm install -g vercel
)

:: Deploy to Vercel
echo Deploying to Vercel...
vercel --prod

echo Deployment complete!
echo Visit your Vercel dashboard to check the deployment status and configure environment variables.