import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRoute from './routes/signupRoute';
import pool from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 0;

app.use(cors());
app.use(express.json());

// Database connection test
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

app.use('/api', signupRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Budget App API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
