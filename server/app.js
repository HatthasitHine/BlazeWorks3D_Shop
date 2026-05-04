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

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Health check with DB touch
app.get('/api/health', async (req, res) => {
  try {
    // Simple query to keep DB active
    await prisma.user.count(); 
    res.json({ status: 'ok', message: 'API and Database are active' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
