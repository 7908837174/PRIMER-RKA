@echo off
echo Pushing project to GitHub using a personal access token...

if "%~1"=="" goto usage
if "%~2"=="" goto usage

set USERNAME=%~1
set TOKEN=%~2

:: Configure the remote URL with the token
git remote set-url origin https://%USERNAME%:%TOKEN%@github.com/7908837174/PRIMER-RKA.git

:: Push to GitHub
git push -u origin main

echo Project pushed to GitHub successfully!
goto end

:usage
echo Usage: %0 ^<your-github-username^> ^<your-personal-access-token^>

:end