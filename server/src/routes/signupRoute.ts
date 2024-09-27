import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import pool from '../config/db';

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

router.post('/signup', async (req: Request, res: Response) => {
  console.log('Received signup request:', req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let result;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );

    await sendWelcomeEmail(email, username);

    res.status(201).json({ 
      message: 'User registered successfully and welcome email sent', 
      userId: result.rows[0].id 
    });
  } catch (error: any) {
    console.error('Detailed signup error:', error);
    
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    
    if (error.code === '23502') {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (error.code === '42P01') {
      return res.status(500).json({ error: 'Database schema error. Please contact support.' });
    }

    if (error.message && error.message.includes('email')) {
      console.error('Email sending failed:', error);
      return res.status(201).json({ 
        message: 'User registered successfully, but welcome email could not be sent',
        userId: result ? result.rows[0].id : null 
      });
    }

    res.status(500).json({ 
      error: 'Server error. Please try again.', 
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;