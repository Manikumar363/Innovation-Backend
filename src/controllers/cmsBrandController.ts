import { Request, Response, NextFunction } from 'express';
import { CmsBrand } from '../models/CmsBrand';
import { CmsHome } from '../models/CmsHome';

export const defaultCmsBrandData = {
  tagline: {
    en: 'TRUSTED BRANDS & PARTNERS',
    ar: 'العلامات التجارية الموثوقة والشركاء',
  },
  title: {
    en: 'Trusted Brands & Partners',
    ar: 'العلامات التجارية والشركاء الموثوقون',
  },
  description: {
    en: 'Partner and investor logos displayed in the trusted brands slider',
    ar: 'شعارات الشركاء والمستثمرين المعروضة في شريط العلامات التجارية الموثوقة',
  },
  brands: [
    {
      id: 'brand-1',
      name: 'Aramco Ventures',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
      websiteUrl: 'https://aramcoventures.com',
      order: 1,
    },
    {
      id: 'brand-2',
      name: 'NEOM Tech',
      logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
      websiteUrl: 'https://neom.com',
      order: 2,
    },
    {
      id: 'brand-3',
      name: 'SABIC Horizon',
      logoUrl: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=300&q=80',
      websiteUrl: 'https://sabic.com',
      order: 3,
    },
    {
      id: 'brand-4',
      name: 'Global Innovation Hub',
      logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80',
      websiteUrl: 'https://example.com',
      order: 4,
    },
  ],
  isActive: true,
};

export const getCmsBrands = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let brandsDoc = await CmsBrand.findOne().lean();

    if (!brandsDoc) {
      // Check if legacy CmsHome had trustedBrands we can seamlessly migrate
      const homeDoc = (await CmsHome.findOne().lean()) as any;
      if (homeDoc && Array.isArray(homeDoc.trustedBrands) && homeDoc.trustedBrands.length > 0) {
        const migratedBrands = homeDoc.trustedBrands.map((b: any, idx: number) => ({
          id: b.id || `brand-${idx + 1}`,
          name: b.name || `Brand #${idx + 1}`,
          logoUrl: b.logoUrl || '',
          websiteUrl: b.websiteUrl || '',
          order: idx + 1,
        }));

        brandsDoc = await CmsBrand.create({
          ...defaultCmsBrandData,
          brands: migratedBrands,
        });
      } else {
        brandsDoc = await CmsBrand.create(defaultCmsBrandData);
      }
    }

    res.status(200).json({
      success: true,
      data: brandsDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCmsBrands = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;

    const updated = await CmsBrand.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Centralized Brand Logos updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const addBrandItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newBrand = {
      id: req.body.id || `brand-${Date.now()}`,
      name: req.body.name || 'New Brand',
      logoUrl: req.body.logoUrl || '',
      websiteUrl: req.body.websiteUrl || '',
      order: req.body.order || 0,
    };

    const doc = await CmsBrand.findOneAndUpdate(
      {},
      { $push: { brands: newBrand } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Brand added successfully',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBrandItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const doc = await CmsBrand.findOneAndUpdate(
      {},
      { $pull: { brands: { id } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Brand removed successfully',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
