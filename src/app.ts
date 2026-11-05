import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import healthRouter from './routes/health';
import cmsRouter from './routes/cmsRoutes';
import uploadRouter from './routes/uploadRoutes';
import quoteRouter from './routes/quoteRoutes';
import enquiryRouter from './routes/enquiryRoutes';
import {
  getCmsBrands,
  updateCmsBrands,
  addBrandItem,
  deleteBrandItem,
} from './controllers/cmsBrandController';
import {
  getCmsCtaBanner,
  updateCmsCtaBanner,
} from './controllers/cmsCtaBannerController';
import {
  getOurCompanies,
  updateOurCompanies,
  addOurCompanyItem,
  deleteOurCompanyItem,
} from './controllers/cmsOurCompaniesController';
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
    brandsEndpoint: '/api/cms/brands (or /api/brands)',
    ourCompaniesEndpoint: '/api/cms/our-companies (or /api/our-companies)',
    ctaBannerEndpoint: '/api/cms/cta-banner (or /api/banner)',
    uploadEndpoint: '/api/upload/public',
    quotesEndpoint: '/api/quotes',
    enquiriesEndpoint: '/api/enquiries',
  });
});

// API Routes
app.use('/api', healthRouter);
app.use('/api/cms', cmsRouter);

// Direct Brand Logos routes (/api/brands and /api/brand-logos)
app.get(['/api/brands', '/api/brand-logos'], getCmsBrands);
app.put(['/api/brands', '/api/brand-logos'], updateCmsBrands);
app.post(['/api/brands', '/api/brand-logos'], updateCmsBrands);
app.post(['/api/brands/item', '/api/brand-logos/item'], addBrandItem);
app.delete(['/api/brands/item/:id', '/api/brand-logos/item/:id'], deleteBrandItem);

// Direct Our Companies routes (/api/our-companies and /api/companies-divisions)
app.get(['/api/our-companies', '/api/companies-divisions'], getOurCompanies);
app.put(['/api/our-companies', '/api/companies-divisions'], updateOurCompanies);
app.post(['/api/our-companies', '/api/companies-divisions'], updateOurCompanies);
app.post(['/api/our-companies/item', '/api/companies-divisions/item'], addOurCompanyItem);
app.delete(['/api/our-companies/item/:id', '/api/companies-divisions/item/:id'], deleteOurCompanyItem);

// Direct CTA Banner routes (/api/cta-banner and /api/banner)
app.get(['/api/cta-banner', '/api/banner', '/api/cta'], getCmsCtaBanner);
app.put(['/api/cta-banner', '/api/banner', '/api/cta'], updateCmsCtaBanner);
app.post(['/api/cta-banner', '/api/banner', '/api/cta'], updateCmsCtaBanner);

app.use('/api/upload', uploadRouter);
app.use('/api/quotes', quoteRouter);
app.use('/api/quote-requests', quoteRouter); // Alias
app.use('/api/enquiries', enquiryRouter);
app.use('/api/enquiry', enquiryRouter); // Alias

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
