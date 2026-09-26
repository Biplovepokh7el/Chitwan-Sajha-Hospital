import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import apiRouter from '../backend/routes/api.js';
import { errorHandler } from '../backend/middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Mount the API router
app.use('/api', apiRouter);

// Error Handler
app.use(errorHandler);

export default app;
