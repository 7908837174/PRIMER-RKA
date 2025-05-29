@echo off
echo This script will push your project to GitHub using GitHub CLI
echo.

:: Check if GitHub CLI is installed
gh --version > nul 2>&1
if %errorlevel% neq 0 (
  echo GitHub CLI (gh) is not installed or not in PATH.
  echo Please install it from https://cli.github.com/ or use push_with_token.bat instead.
  exit /b 1
)

:: Login to GitHub if not already logged in
gh auth status > nul 2>&1
if %errorlevel% neq 0 (
  echo You need to log in to GitHub first.
  echo.
  gh auth login
)

:: Create the repository if it doesn't exist
echo Checking if repository exists...
gh repo view 7908837174/PRIMER-RKA > nul 2>&1
if %errorlevel% neq 0 (
  echo Creating repository...
  gh repo create 7908837174/PRIMER-RKA --public --source=. --remote=origin
) else (
  echo Repository exists, setting as remote...
  git remote remove origin 2> nul
  git remote add origin https://github.com/7908837174/PRIMER-RKA.git
)

:: Push to GitHub
echo Pushing to GitHub...
git push -f origin main

echo.
echo Project pushed to GitHub successfully!