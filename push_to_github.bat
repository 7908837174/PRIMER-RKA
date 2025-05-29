@echo off
echo Pushing project to GitHub...

:: Remove existing .git directories in subdirectories
for /d /r . %%d in (.git) do @if NOT "%%d"==".\.git" rd /s /q "%%d"

:: Initialize git repository if not already initialized
if not exist .git (
  git init
)

:: Configure git
git config --local user.name "GitHub User"
git config --local user.email "user@example.com"

:: Add all files
git add .

:: Commit changes
git commit -m "Initial commit of full project"

:: Add remote repository
git remote remove origin 2>nul
git remote add origin https://github.com/7908837174/PRIMER-RKA.git

:: Push to GitHub
:: Note: This will prompt for GitHub credentials
git push -u origin main

echo Project pushed to GitHub successfully!