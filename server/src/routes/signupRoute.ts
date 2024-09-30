import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import pool from '../config/db';  // PostgreSQL connection setup

dotenv.config();

const router = Router();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send welcome email
const sendWelcomeEmail = async (toEmail: string, username: string): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Welcome to Our App!',
    text: `Hello ${username}, welcome to our platform! We're excited to have you.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Registration route
router.post('/signup', async (req: Request, res: Response) => {
  console.log('Received signup request:', req.body);
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let result;
  try {
    // Check if email is already registered
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const emailResult = await pool.query(emailCheckQuery, [email]);

    if (emailResult.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password using bcrypt before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 rounds of salting
    console.log('Hashed password:', hashedPassword);  // Debugging

    // Insert the user with the hashed password into the database
    result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );

    // Send welcome email
    await sendWelcomeEmail(email, username);

    res.status(201).json({ 
      message: 'User registered successfully and welcome email sent', 
      userId: result.rows[0].id 
    });
  } catch (error: any) {
    console.error('Detailed signup error:', error);
    
    // Handle specific database errors
    if (error.code === '23505') {  // Unique constraint violation
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    
    if (error.code === '23502') {  // Null value constraint violation
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (error.code === '42P01') {  // Undefined table error
      return res.status(500).json({ error: 'Database schema error. Please contact support.' });
    }

    // Handle email sending failure
    if (error.message && error.message.includes('email')) {
      console.error('Email sending failed:', error);
      return res.status(201).json({ 
        message: 'User registered successfully, but welcome email could not be sent',
        userId: result ? result.rows[0].id : null 
      });
    }

    // Generic server error
    res.status(500).json({ 
      error: 'Server error. Please try again.', 
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
