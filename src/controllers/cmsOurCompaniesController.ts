import { Request, Response, NextFunction } from 'express';
import { CmsOurCompanies } from '../models/CmsOurCompanies';
import { CmsHome } from '../models/CmsHome';

export const defaultOurCompaniesData = {
  tagline: {
    en: 'SPECIALIZED COMPANIES & DIVISIONS',
    ar: 'الشركات والأقسام المتخصصة',
  },
  title: {
    en: 'Our Companies',
    ar: 'شركاتنا',
  },
  description: {
    en: 'A diversified ecosystem of specialized entities driving excellence across infrastructure, medical technology, and trading.',
    ar: 'منظومة متنوعة من الكيانات المتخصصة التي تقود التميز في البنية التحتية والتكنولوجيا الطبية والتجارة.',
  },
  companies: [
    {
      id: 'company-1',
      name: {
        en: 'Projects Innovator',
        ar: 'مبتكر المشاريع',
      },
      description: {
        en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
        ar: 'تقديم حلول البناء والبنية التحتية المبتكرة التي تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
      },
      logoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=300&q=80',
      websiteUrl: '/projects-innovator',
      color: 'red',
      order: 1,
      isActive: true,
    },
    {
      id: 'company-2',
      name: {
        en: 'Attractive',
        ar: 'أتراكتيف',
      },
      description: {
        en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
        ar: 'مجموعة أعمال متنوعة تقود التميز في قطاعات الرعاية الصحية والبناء والتجارة والاستثمار.',
      },
      logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
      websiteUrl: '/attractive',
      color: 'blue',
      order: 2,
      isActive: true,
    },
    {
      id: 'company-3',
      name: {
        en: 'Medics Innovator',
        ar: 'ميديكس إنوفيتور',
      },
      description: {
        en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
        ar: 'الارتقاء بالرعاية الصحية من خلال الحلول الطبية الموثوقة والمنتجات الصحية عالية الجودة والالتزام بتحسين نتائج المرضى.',
      },
      logoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=300&q=80',
      websiteUrl: '/medics-innovator',
      color: 'blue',
      order: 3,
      isActive: true,
    },
  ],
  isActive: true,
};

export const getOurCompanies = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let doc = await CmsOurCompanies.findOne().lean();

    if (!doc) {
      // Check if CmsHome had companiesSection we can migrate
      const homeDoc = (await CmsHome.findOne().lean()) as any;
      if (
        homeDoc &&
        homeDoc.companiesSection &&
        Array.isArray(homeDoc.companiesSection.companies) &&
        homeDoc.companiesSection.companies.length > 0
      ) {
        doc = await CmsOurCompanies.create({
          tagline: homeDoc.companiesSection.tagline || defaultOurCompaniesData.tagline,
          title: homeDoc.companiesSection.title || defaultOurCompaniesData.title,
          description:
            homeDoc.companiesSection.description || defaultOurCompaniesData.description,
          companies: homeDoc.companiesSection.companies.map((c: any, idx: number) => ({
            id: c.id || `company-${idx + 1}`,
            name: c.name || { en: `Company #${idx + 1}`, ar: `شركة #${idx + 1}` },
            description: c.description || { en: '', ar: '' },
            logoUrl: c.logoUrl || '',
            websiteUrl: c.websiteUrl || (idx === 0 ? '/projects-innovator' : idx === 1 ? '/attractive' : '/medics-innovator'),
            color: c.color || (idx === 0 ? 'red' : 'blue'),
            order: idx + 1,
            isActive: true,
          })),
          isActive: true,
        });
      } else {
        doc = await CmsOurCompanies.create(defaultOurCompaniesData);
      }
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOurCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = req.body;

    const updated = await CmsOurCompanies.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Our Companies section updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const addOurCompanyItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newCompany = {
      id: req.body.id || `company-${Date.now()}`,
      name: req.body.name || { en: 'New Company', ar: 'شركة جديدة' },
      description: req.body.description || { en: '', ar: '' },
      logoUrl: req.body.logoUrl || '',
      websiteUrl: req.body.websiteUrl || '',
      color: req.body.color || 'blue',
      order: req.body.order || 0,
      isActive: req.body.isActive !== false,
    };

    const doc = await CmsOurCompanies.findOneAndUpdate(
      {},
      { $push: { companies: newCompany } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Company item added successfully',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOurCompanyItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const doc = await CmsOurCompanies.findOneAndUpdate(
      {},
      { $pull: { companies: { id } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Company item removed successfully',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

