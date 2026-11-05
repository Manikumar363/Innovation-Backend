import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import healthRouter from './routes/health';
import cmsRouter from './routes/cmsRoutes';
import uploadRouter from './routes/uploadRoutes';
import quoteRouter from './routes/quoteRoutes';
import enquiryRouter from './routes/enquiryRoutes';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static folder for uploaded files in development fallback
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Express & MongoDB API - Innovation Backend',
    documentation: '/api/health',
    cmsEndpoint: '/api/cms/home',
    uploadEndpoint: '/api/upload/public',
    quotesEndpoint: '/api/quotes',
    enquiriesEndpoint: '/api/enquiries',
  });
});

// API Routes
app.use('/api', healthRouter);
app.use('/api/cms', cmsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/quotes', quoteRouter);
app.use('/api/quote-requests', quoteRouter); // Alias
app.use('/api/enquiries', enquiryRouter);
app.use('/api/enquiry', enquiryRouter); // Alias

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
