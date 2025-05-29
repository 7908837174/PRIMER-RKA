@echo off
echo Simple GitHub Push Script
echo.
echo This script will push your project to GitHub using a personal access token.
echo.

set /p TOKEN=Enter your GitHub Personal Access Token: 

echo Setting up remote with token...
git remote remove origin 2>nul
git remote add origin https://7908837174:%TOKEN%@github.com/7908837174/PRIMER-RKA.git

echo Pushing to GitHub...
git push -f origin main

echo.
echo Done!