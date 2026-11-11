import { Router } from 'express';
import { getCmsHome, updateCmsHome } from '../controllers/cmsController';
import { getCmsAbout, updateCmsAbout } from '../controllers/cmsAboutController';
import { getCmsCompany, updateCmsCompany } from '../controllers/cmsCompanyController';
import { getCmsServices, updateCmsServices } from '../controllers/cmsServicesController';
import {
  getAllServices,
  getServiceBySlug,
  createServicePage,
  updateServicePage,
  deleteServicePage,
  resetDefaultServices,
} from '../controllers/servicePageController';
import { getCmsShop, updateCmsShop } from '../controllers/cmsShopController';
import { getCmsProjects, updateCmsProjects } from '../controllers/cmsProjectsController';
import { getCmsPartners, updateCmsPartners } from '../controllers/cmsPartnersController';
import { getCmsContact, updateCmsContact } from '../controllers/cmsContactController';
import { getCmsInvestment, updateCmsInvestment } from '../controllers/cmsInvestmentController';
import {
  getCmsProjectsInnovator,
  updateCmsProjectsInnovator,
} from '../controllers/cmsProjectsInnovatorController';
import {
  getCmsAttractive,
  updateCmsAttractive,
} from '../controllers/cmsAttractiveController';
import {
  getCmsMedicsInnovator,
  updateCmsMedicsInnovator,
} from '../controllers/cmsMedicsInnovatorController';
import {
  getCmsCtaBanner,
  updateCmsCtaBanner,
} from '../controllers/cmsCtaBannerController';
import {
  getCmsBrands,
  updateCmsBrands,
  addBrandItem,
  deleteBrandItem,
} from '../controllers/cmsBrandController';
import {
  getOurCompanies,
  updateOurCompanies,
  addOurCompanyItem,
  deleteOurCompanyItem,
} from '../controllers/cmsOurCompaniesController';
import {
  getCmsFounder,
  updateCmsFounder,
  addFounderCompany,
  deleteFounderCompany,
  resetFounderToDefaults,
} from '../controllers/cmsFounderController';

const router = Router();

// Founder Section Routes
router.get('/founder', getCmsFounder);
router.put('/founder', updateCmsFounder);
router.post('/founder', updateCmsFounder);
router.post('/founder/company', addFounderCompany);
router.delete('/founder/company/:id', deleteFounderCompany);
router.post('/founder/reset-defaults', resetFounderToDefaults);
// Aliases for Founder Section
router.get(['/founder-message', '/founder-section'], getCmsFounder);
router.put(['/founder-message', '/founder-section'], updateCmsFounder);
router.post(['/founder-message', '/founder-section'], updateCmsFounder);

// Specialized Companies & Divisions (Our Companies) Routes
router.get('/our-companies', getOurCompanies);
router.put('/our-companies', updateOurCompanies);
router.post('/our-companies', updateOurCompanies);
router.post('/our-companies/item', addOurCompanyItem);
router.delete('/our-companies/item/:id', deleteOurCompanyItem);
// Aliases for Our Companies
router.get('/specialized-companies', getOurCompanies);
router.put('/specialized-companies', updateOurCompanies);
router.post('/specialized-companies', updateOurCompanies);
router.get('/companies-divisions', getOurCompanies);
router.put('/companies-divisions', updateOurCompanies);
router.post('/companies-divisions', updateOurCompanies);
router.get('/division-companies', getOurCompanies);
router.put('/division-companies', updateOurCompanies);
router.post('/division-companies', updateOurCompanies);

// Centralized Brand Logos Routes (can be used everywhere)
router.get('/brands', getCmsBrands);
router.put('/brands', updateCmsBrands);
router.post('/brands', updateCmsBrands);
router.post('/brands/item', addBrandItem);
router.delete('/brands/item/:id', deleteBrandItem);
// Aliases for centralized brands
router.get('/brand-logos', getCmsBrands);
router.put('/brand-logos', updateCmsBrands);
router.post('/brand-logos', updateCmsBrands);
router.get('/trusted-brands', getCmsBrands);
router.put('/trusted-brands', updateCmsBrands);
router.post('/trusted-brands', updateCmsBrands);

// Centralized Call-To-Action (CTA) Banner Routes
router.get('/cta-banner', getCmsCtaBanner);
router.put('/cta-banner', updateCmsCtaBanner);
router.post('/cta-banner', updateCmsCtaBanner);
router.get('/cta', getCmsCtaBanner);
router.put('/cta', updateCmsCtaBanner);
router.post('/cta', updateCmsCtaBanner);

// CMS Home Routes
router.get('/home', getCmsHome);
router.put('/home', updateCmsHome);
router.post('/home', updateCmsHome);

// CMS About Routes
router.get('/about', getCmsAbout);
router.put('/about', updateCmsAbout);
router.post('/about', updateCmsAbout);

// CMS Company Profile Routes
router.get('/company', getCmsCompany);
router.put('/company', updateCmsCompany);
router.post('/company', updateCmsCompany);

// CMS Services Routes
router.get('/services', getCmsServices);
router.put('/services', updateCmsServices);
router.post('/services', updateCmsServices);

// Service Pages (Reusable Common Layout for Medical Equipment, Lab Supplies, Healthcare Solutions, Standards)
router.get('/services/pages', getAllServices);
router.get('/services/page/:slug', getServiceBySlug);
router.post('/services/page', createServicePage);
router.put('/services/page/:id', updateServicePage);
router.delete('/services/page/:id', deleteServicePage);
router.post('/services/reset-defaults', resetDefaultServices);

// CMS Shop Routes
router.get('/shop', getCmsShop);
router.put('/shop', updateCmsShop);
router.post('/shop', updateCmsShop);

// CMS Investment Routes
router.get('/investment', getCmsInvestment);
router.put('/investment', updateCmsInvestment);
router.post('/investment', updateCmsInvestment);

// CMS Projects Routes
router.get('/projects', getCmsProjects);
router.put('/projects', updateCmsProjects);
router.post('/projects', updateCmsProjects);

// CMS Partners Routes
router.get('/partners', getCmsPartners);
router.put('/partners', updateCmsPartners);
router.post('/partners', updateCmsPartners);

// CMS Contact Routes
router.get('/contact', getCmsContact);
router.put('/contact', updateCmsContact);
router.post('/contact', updateCmsContact);

// CMS Projects Innovator Routes
router.get('/projects-innovator', getCmsProjectsInnovator);
router.put('/projects-innovator', updateCmsProjectsInnovator);
router.post('/projects-innovator', updateCmsProjectsInnovator);
router.get('/project-innovator', getCmsProjectsInnovator);
router.put('/project-innovator', updateCmsProjectsInnovator);
router.post('/project-innovator', updateCmsProjectsInnovator);

// CMS Attractive Routes
router.get('/attractive', getCmsAttractive);
router.put('/attractive', updateCmsAttractive);
router.post('/attractive', updateCmsAttractive);
router.get('/atriktif', getCmsAttractive);
router.put('/atriktif', updateCmsAttractive);
router.post('/atriktif', updateCmsAttractive);

// CMS Medics Innovator Routes
router.get('/medics-innovator', getCmsMedicsInnovator);
router.put('/medics-innovator', updateCmsMedicsInnovator);
router.post('/medics-innovator', updateCmsMedicsInnovator);
router.get('/medics', getCmsMedicsInnovator);
router.put('/medics', updateCmsMedicsInnovator);
router.post('/medics', updateCmsMedicsInnovator);

export default router;
