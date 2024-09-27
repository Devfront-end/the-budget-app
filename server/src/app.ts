import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRoute from './routes/signupRoute';

dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api', signupRoute); // This will mount the /signup route under /api

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;