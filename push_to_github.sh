#!/bin/bash

# Remove existing .git directories in subdirectories
find . -name ".git" -type d -not -path "./.git" -exec rm -rf {} +

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  git init
fi

# Configure git
git config --local user.name "GitHub User"
git config --local user.email "user@example.com"

# Add all files
git add .

# Commit changes
git commit -m "Initial commit of full project"

# Add remote repository
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/7908837174/PRIMER-RKA.git

# Push to GitHub
# Note: This will prompt for GitHub credentials
git push -u origin main

echo "Project pushed to GitHub successfully!"