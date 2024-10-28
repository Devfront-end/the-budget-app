#!/bin/bash

# Set environment variables for database passwords
export DB_PASSWORD_DEVELOPMENT="your_development_password"
export DB_PASSWORD_TEST="your_test_password"
export DB_PASSWORD_PRODUCTION="your_production_password"

# Display the environment variables to confirm they are set
echo "Development DB Password: $DB_PASSWORD_DEVELOPMENT"
echo "Test DB Password: $DB_PASSWORD_TEST"
echo "Production DB Password: $DB_PASSWORD_PRODUCTION"

# You can add more environment variables here if needed
echo "Environment variables have been set!"

