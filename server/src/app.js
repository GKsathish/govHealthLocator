import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import hospitalRoutes from './routes/hospitalRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173'
    })
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('dev'));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  app.get('/api/health', (_, res) => {
    res.json({ status: 'ok', service: 'government-healthcare-locator' });
  });

  app.use('/api/hospitals', hospitalRoutes);
  app.use('/api/locations', locationRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
