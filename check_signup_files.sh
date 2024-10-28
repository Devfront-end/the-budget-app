#!/bin/bash

# Navigate to the server directory
cd server

# Print current directory
echo "Current directory: $(pwd)"

# Check signup route
echo "\n--- Signup Route ---"
cat src/routes/signupRoute.ts 2>/dev/null || echo "signupRoute.ts not found"

# Check main server file
echo "\n--- Main Server File ---"
cat src/server.ts 2>/dev/null || cat src/app.ts 2>/dev/null || echo "server.ts or app.ts not found"

# Check database configuration
echo "\n--- Database Configuration ---"
cat src/config/db.ts 2>/dev/null || echo "db.ts not found"

# List contents of key directories
echo "\n--- Contents of src/routes ---"
ls -l src/routes

echo "\n--- Contents of src/config ---"
ls -l src/config

echo "\n--- Contents of src ---"
ls -l src

# Check package.json
echo "\n--- package.json ---"
cat package.json

# Check .env file (if it exists)
echo "\n--- .env file (if exists) ---"
cat .env 2>/dev/null || echo ".env file not found"

# Return to the original directory
cd ..

# Check client-side signup form
echo "\n--- Client-side Signup Form ---"
cat client/src/components/SignUpForm.tsx 2>/dev/null || echo "SignUpForm.tsx not found"

echo "\nScript completed."