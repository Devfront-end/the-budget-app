import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

// Setup the transporter using your Gmail credentials from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address from .env
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

// Function to send email (can be used in your signup flow)
export const sendWelcomeEmail = async (toEmail: string, username: string) => {
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
  }
};

export default transporter;