#!/bin/bash

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Reinstall dependencies with legacy peer deps option
echo "Reinstalling dependencies with --legacy-peer-deps..."
npm install --legacy-peer-deps

# Check the installed version of axios
echo "Checking installed version of axios..."
npm ls axios

# Run npm audit fix to resolve vulnerabilities
echo "Running npm audit fix..."
npm audit fix --legacy-peer-deps

# Final message
echo "Done! Please check for any further issues in your project."
