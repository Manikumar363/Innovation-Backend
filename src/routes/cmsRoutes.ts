import { Router } from 'express';
import { getCmsHome, updateCmsHome } from '../controllers/cmsController';
import { getCmsAbout, updateCmsAbout } from '../controllers/cmsAboutController';
import { getCmsCompany, updateCmsCompany } from '../controllers/cmsCompanyController';
import { getCmsServices, updateCmsServices } from '../controllers/cmsServicesController';
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

const router = Router();

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
