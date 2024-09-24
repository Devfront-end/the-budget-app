#!/bin/bash

# Connect to PostgreSQL and execute the following commands
psql -U postgres <<EOF

-- Create database
CREATE DATABASE "the-budget-app";

-- Create user/role
CREATE ROLE app_user WITH LOGIN PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE "the-budget-app" TO app_user;

-- Connect to the newly created database
\c "the-budget-app";

-- Create expenses table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC NOT NULL,
    date DATE NOT NULL
);

-- Insert some sample data
INSERT INTO expenses (description, amount, date) 
VALUES ('Groceries', 50.00, '2024-09-25');

EOF

echo "Database and table setup complete."
