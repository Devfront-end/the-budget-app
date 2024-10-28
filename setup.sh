#!/bin/bash

# Navigate to the server directory
cd server

# Install dependencies
npm install

# Compile TypeScript files
npx tsc

# Navigate back to the project root
cd ..

# Other setup commands
echo "Setup complete."