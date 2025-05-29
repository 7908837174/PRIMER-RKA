#!/bin/bash

# This script pushes the repository to GitHub using a personal access token
# Usage: ./push_with_token.sh <your-github-username> <your-personal-access-token>

if [ $# -ne 2 ]; then
  echo "Usage: $0 <your-github-username> <your-personal-access-token>"
  exit 1
fi

USERNAME=$1
TOKEN=$2

# Configure the remote URL with the token
git remote set-url origin https://${USERNAME}:${TOKEN}@github.com/7908837174/PRIMER-RKA.git

# Push to GitHub
git push -u origin main

echo "Project pushed to GitHub successfully!"