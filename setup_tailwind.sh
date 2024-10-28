#!/bin/bash

# Check if package.json exists
if [ ! -f package.json ]; then
  echo "package.json not found. Please ensure you are in the root directory of a React project."
  exit 1
fi

# Install Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p

# Add Tailwind to your CSS
echo '@tailwind base;' >> ./src/index.css
echo '@tailwind components;' >> ./src/index.css
echo '@tailwind utilities;' >> ./src/index.css

echo "Tailwind CSS has been set up successfully."