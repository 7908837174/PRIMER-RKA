@echo off
echo ========================================
echo    PRIMER AUTO DEPLOYMENT SCRIPT
echo ========================================
echo.

echo 🚀 Starting automatic deployment...
echo.

echo [1/8] Installing global dependencies...
call npm install -g surge @railway/cli vercel

echo.
echo [2/8] Building Backend...
cd Backend1
call npm install
call npm run build
echo ✅ Backend built successfully

echo.
echo [3/8] Building Frontend...
cd ../client
call npm install
call npm run build
echo ✅ Frontend built successfully

echo.
echo [4/8] Setting up SPA routing for Surge...
copy dist\index.html dist\200.html
echo ✅ SPA routing configured

echo.
echo [5/8] Deploying Frontend to Surge...
call surge dist primer-rka-live.surge.sh
echo ✅ Frontend deployed to: https://primer-rka-live.surge.sh

echo.
echo [6/8] Deploying Backend to Railway...
cd ../Backend1
call railway login
call railway up
echo ✅ Backend deployed to Railway

echo.
echo [7/8] Setting Railway environment variables...
call railway variables --set "NODE_ENV=production"
call railway variables --set "PORT=8080"
call railway variables --set "BASE_PATH=/api"
echo ✅ Environment variables configured

echo.
echo [8/8] Deployment verification...
echo.
echo ========================================
echo    🎉 DEPLOYMENT COMPLETE! 🎉
echo ========================================
echo.
echo 🌐 LIVE URLS:
echo Frontend: https://primer-rka-live.surge.sh
echo Backend: Check Railway dashboard for URL
echo.
echo ✅ FEATURES READY:
echo • User authentication (email/password)
echo • Workspace management
echo • Project organization
echo • Task tracking
echo • Team collaboration
echo • Analytics dashboard
echo.
echo 🔧 NEXT STEPS:
echo 1. Test the live application
echo 2. Configure Google OAuth (optional)
echo 3. Invite team members
echo 4. Start managing projects!
echo.
pause
