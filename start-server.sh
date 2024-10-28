#!/bin/bash

# Stop the script if any command fails
set -e

# Log file for the script
LOG_FILE="server.log"

# Compile the TypeScript code
echo "Compiling TypeScript code..." | tee -a $LOG_FILE
npx tsc | tee -a $LOG_FILE

# Check if the compilation was successful
if [ $? -eq 0 ]; then
  echo "TypeScript compiled successfully!" | tee -a $LOG_FILE
else
  echo "TypeScript compilation failed!" | tee -a $LOG_FILE
  exit 1
fi

# Kill any process running on port 3001
echo "Killing any processes running on port 3001..." | tee -a $LOG_FILE
lsof -ti:3001 | xargs kill -9 || echo "No process running on port 3001" | tee -a $LOG_FILE

# Check for environment variables
if [ -z "$EMAIL_USER" ] || [ -z "$EMAIL_PASS" ]; then
  echo "EMAIL_USER or EMAIL_PASS is not set. Please check your .env file." | tee -a $LOG_FILE
  exit 1
fi

# Export environment variables
export EMAIL_USER=your-email@example.com
export EMAIL_PASS=your-email-password

# Run the server
echo "Starting the server..." | tee -a $LOG_FILE
node dist/server.js | tee -a $LOG_FILE &

# Wait for the server to start
sleep 3

# Optional Nodemailer email test
if [ "$1" == "--test-email" ]; then
  echo "Testing Nodemailer email functionality..." | tee -a $LOG_FILE
  node -e "
  const nodemailer = require('nodemailer');
  require('dotenv').config();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    debug: true, // Enable debug logging
  });

  console.log('Email user:', process.env.EMAIL_USER);
  console.log('Email pass:', process.env.EMAIL_PASS);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient-email@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent: ' + info.response);
  });
  " | tee -a $LOG_FILE
fi

echo "Shell script completed." | tee -a $LOG_FILE