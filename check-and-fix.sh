#!/bin/bash

# Set the root directory of the project
PROJECT_DIR=$(pwd)

# Step 1: Check if necessary tools are installed
echo "Checking for necessary tools..."

# Function to check for tool installations
check_tool() {
  if ! command -v $1 &> /dev/null; then
    echo "$1 is not installed. Installing..."
    npm install -g $1
  else
    echo "$1 is installed."
  fi
}

check_tool eslint
check_tool prettier
check_tool typescript
check_tool npm

# Step 2: Install dependencies
echo "Installing dependencies..."
npm install

# Step 3: Run ESLint to find and fix linting issues
echo "Running ESLint to check and fix code issues..."
npx eslint "$PROJECT_DIR/src" --ext .js,.jsx,.ts,.tsx --fix

# Step 4: Run Prettier to format the code
echo "Running Prettier to format the code..."
npx prettier --write "$PROJECT_DIR/src/**/*.{js,jsx,ts,tsx,css,scss,html}"

# Step 5: Run TypeScript type checking (if using TypeScript)
if [ -f "$PROJECT_DIR/tsconfig.json" ]; then
  echo "Running TypeScript type checks..."
  npx tsc --noEmit
else
  echo "No tsconfig.json found. Skipping TypeScript checks."
fi

# Step 6: Run npm audit to check for security vulnerabilities
echo "Running npm audit for security vulnerabilities..."
npm audit fix

# Step 7: Final status
echo "All checks and fixes completed."

