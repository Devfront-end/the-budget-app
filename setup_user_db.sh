#!/bin/bash

# Variables
DB_NAME="the-budget-app"
DB_USER="postgres"
DB_PASSWORD="your_postgres_password"
USER_PASSWORD="test_password"

# Connect to PostgreSQL and run SQL commands
psql -U $DB_USER -d $DB_NAME -c "
-- Create the users table
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user with a hashed password (for testing)
INSERT INTO public.users (username, email, password) 
VALUES ('test_user', 'test_user@example.com', crypt('$USER_PASSWORD', gen_salt('bf')));
"

# Feedback
echo "User table created and test user added successfully."
