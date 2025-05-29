@echo off
echo GitHub Push Command Generator
echo.
echo This script will generate a Git command to push your project to GitHub.
echo.

set /p TOKEN=Enter your GitHub Personal Access Token: 

echo.
echo Copy and paste this command to push your project:
echo.
echo git push -f https://7908837174:%TOKEN%@github.com/7908837174/PRIMER-RKA.git main
echo.
echo Note: Be careful not to share this command as it contains your token.