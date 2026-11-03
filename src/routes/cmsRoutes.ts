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

const router = Router();

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
