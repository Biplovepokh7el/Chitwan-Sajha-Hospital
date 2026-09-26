import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import apiRouter from './routes/api.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false
}));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate Limiter for API
app.use('/api', apiLimiter);

// Serve File Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve Frontend Static Files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API Router
app.use('/api', apiRouter);

// Fallback route for SPA Client Router
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server locally (prevent app.listen inside Vercel serverless environment)
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`
============================================================
🏥 CHITWAN SAJHA HOSPITAL - ENTERPRISE BACKEND ONLINE
🌐 Web Server URL: http://127.0.0.1:${PORT}
⚡ Environment:   ${process.env.NODE_ENV || 'development'}
============================================================
    `);
  });
}

export default app;
