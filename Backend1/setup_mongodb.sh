#!/bin/bash

# MongoDB setup script for PRIMER-RKA
echo "MongoDB Setup Helper for PRIMER-RKA"
echo "==================================="

# Check if MongoDB is installed
if command -v mongod &> /dev/null; then
  echo "✅ MongoDB is already installed."
else
  echo "❌ MongoDB is not installed."
  echo "Please install MongoDB using one of the following methods:"
  echo ""
  echo "For Ubuntu/Debian:"
  echo "  sudo apt-get update"
  echo "  sudo apt-get install -y mongodb"
  echo ""
  echo "For macOS (using Homebrew):"
  echo "  brew tap mongodb/brew"
  echo "  brew install mongodb-community"
  echo ""
  echo "For Windows:"
  echo "  Download and install from: https://www.mongodb.com/try/download/community"
  echo ""
  echo "Alternatively, use MongoDB Atlas (cloud-hosted):"
  echo "  1. Visit https://www.mongodb.com/cloud/atlas/register"
  echo "  2. Create a free account and cluster"
  echo "  3. Get your connection string and update .env"
  exit 1
fi

# Check if MongoDB is running
if pgrep mongod > /dev/null; then
  echo "✅ MongoDB service is running."
else
  echo "❌ MongoDB service is not running."
  echo "Starting MongoDB..."
  
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # For Linux
    sudo systemctl start mongodb || sudo service mongodb start
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    # For macOS
    brew services start mongodb-community
  else
    echo "Please start MongoDB manually according to your operating system."
    exit 1
  fi
  
  # Check if MongoDB started successfully
  sleep 2
  if pgrep mongod > /dev/null; then
    echo "✅ MongoDB service started successfully."
  else
    echo "❌ Failed to start MongoDB service."
    echo "Please start MongoDB manually or use MongoDB Atlas."
    exit 1
  fi
fi

# Create the PRIMER database
echo "Creating PRIMER database..."
mongosh --eval "use primer-db" || mongo --eval "use primer-db"

echo ""
echo "MongoDB setup complete!"
echo "Your local MongoDB connection string is: mongodb://localhost:27017/primer-db"
echo "Make sure this is set in your .env file as MONGO_URI."
echo ""
echo "To use this connection string, update your .env file:"
echo "MONGO_URI=mongodb://localhost:27017/primer-db"
