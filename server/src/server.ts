import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import signupRoute from './routes/signupRoute'; // Import the signup route
import { Pool, QueryResult } from 'pg'; // Import PostgreSQL connection

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Server starting...');
console.log('Environment variables loaded:', process.env);

// Create an Express application
const app = express();
const port = process.env.PORT || 3006; // Change to 3006 to avoid EADDRINUSE error

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Log environment variables for debugging
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432, // Ensure port is a number
});

// Test DB connection
pool.query('SELECT NOW()', (err: Error | null, res: QueryResult) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0].now);
  }
});

// Use signup route at /api/signup
app.use('/api', signupRoute);

// Default route for API status check
app.get('/api/status', (req, res) => {
  res.send('API is running');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling middleware for unhandled errors
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
