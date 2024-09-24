#!/bin/bash

# Function to check if file exists
check_file_exists() {
  if [ -f "$1" ]; then
    echo "✔ $1 file exists."
  else
    echo "✘ $1 file does not exist."
  fi
}

# Check if .env file exists
check_file_exists ".env"

# Check if dotenv is installed in node_modules
if npm list dotenv &>/dev/null; then
  echo "✔ dotenv package is installed."
else
  echo "✘ dotenv package is not installed. Run 'npm install dotenv'."
fi

# Check if .env is in .gitignore
if grep -q "^\.env" .gitignore; then
  echo "✔ .env is listed in .gitignore."
else
  echo "✘ .env is not listed in .gitignore. It's recommended to add it to prevent sensitive data from being committed."
fi

# Check if the environment variables are set
if [ -f ".env" ]; then
  echo "Checking environment variables in .env file..."

  # Array of required environment variables (add more if needed)
  required_env_vars=("DB_PASSWORD_DEVELOPMENT" "DB_PASSWORD_TEST" "DB_PASSWORD_PRODUCTION")

  # Loop through and check each environment variable
  for var in "${required_env_vars[@]}"; do
    if grep -q "^$var=" .env; then
      echo "✔ $var is set in .env."
    else
      echo "✘ $var is missing in .env."
    fi
  done
fi
