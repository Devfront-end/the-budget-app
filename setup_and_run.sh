#!/bin/bash

# Navigate to the server directory
cd "$(dirname "$0")/server"

# Load environment variables from the .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Install dependencies
npm install

# Compile TypeScript files
npx tsc
#!/bin/bash

# Navigate to the server directory
cd "$(dirname "$0")/server"

# Load environment variables from the .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Install dependencies
npm install

# Compile TypeScript files
npx tsc

# Start the server
node dist/server.js
