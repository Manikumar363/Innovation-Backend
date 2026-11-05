import { Request, Response, NextFunction } from 'express';
import { CmsCtaBanner } from '../models/CmsCtaBanner';
import { CmsHome } from '../models/CmsHome';

export const defaultCmsCtaBannerData = {
  tagline: {
    en: "LET'S WORK TOGETHER",
    ar: 'لنعمل معاً',
  },
  title: {
    en: "Let's Build Something That Moves Business Forward.",
    ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
  },
  description: {
    en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
    ar: 'هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية، أو خدمات أعمال؟ فريقنا مستعد لمساعدتك في العثور على ما تحتاجه.',
  },
  primaryButtonText: {
    en: 'Get a Quote',
    ar: 'احصل على عرض سعر',
  },
  primaryButtonUrl: '/contact',
  secondaryButtonText: {
    en: 'Contact Us',
    ar: 'اتصل بنا',
  },
  secondaryButtonUrl: '/contact',
  isActive: true,
};

export const getCmsCtaBanner = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let ctaData = await CmsCtaBanner.findOne().lean();

    if (!ctaData) {
      // Check if CmsHome has existing bannerSection data to seed from
      const homeData = await CmsHome.findOne().lean();
      if (homeData && homeData.bannerSection) {
        ctaData = await CmsCtaBanner.create({
          ...defaultCmsCtaBannerData,
          ...homeData.bannerSection,
        });
      } else {
        ctaData = await CmsCtaBanner.create(defaultCmsCtaBannerData);
      }
    }

    res.status(200).json({
      success: true,
      data: ctaData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCmsCtaBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;

    const updated = await CmsCtaBanner.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    // Also synchronize with CmsHome.bannerSection so existing home endpoints stay in sync
    await CmsHome.findOneAndUpdate(
      {},
      {
        $set: {
          bannerSection: {
            tagline: updated.tagline,
            title: updated.title,
            description: updated.description,
            primaryButtonText: updated.primaryButtonText,
            primaryButtonUrl: updated.primaryButtonUrl,
            secondaryButtonText: updated.secondaryButtonText,
            secondaryButtonUrl: updated.secondaryButtonUrl,
          },
        },
      }
    ).catch(() => {});

    res.status(200).json({
      success: true,
      message: 'Centralized CTA Banner updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

