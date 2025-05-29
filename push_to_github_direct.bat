@echo off
echo Pushing project to GitHub repository...

:: Set the repository URL
set REPO_URL=https://github.com/7908837174/PRIMER-RKA.git

:: Check if we're already on main branch
git branch | findstr "* main" > nul
if %errorlevel% neq 0 (
  git checkout -b main
)

:: Configure the remote
git remote -v | findstr "origin" > nul
if %errorlevel% neq 0 (
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)

:: Force push to GitHub (use with caution)
git push -f origin main

echo.
echo If you see permission errors, you need to authenticate with GitHub.
echo Options:
echo 1. Run 'git push -f origin main' after logging in with 'gh auth login' if you have GitHub CLI
echo 2. Use push_with_token.bat with your username and personal access token
echo.