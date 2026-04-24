import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

import portfolioRoutes from './routes/portfolio.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import queueRoutes from './routes/queue.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/queue', queueRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
