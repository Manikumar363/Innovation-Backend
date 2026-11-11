import { Request, Response } from 'express';
import CmsAttractive, { ICmsAttractive } from '../models/CmsAttractive';

export const defaultCmsAttractiveData = {
  colorTheme: 'blue',
  heroBannerSection: {
    logoUrl: '',
    logoText: {
      en: 'ATTRACTIVE',
      ar: 'أتراكتيف',
    },
    title: {
      en: 'Building Tomorrow',
      ar: 'بناء الغد',
    },
    titleHighlight: {
      en: 'Through Innovation',
      ar: 'من خلال الابتكار',
    },
    description: {
      en: 'Delivering innovative solutions, high-grade medical systems, and modern infrastructure that shape a better future.',
      ar: 'تقديم حلول مبتكرة وأنظمة طبية متطورة وبنية تحتية حديثة تشكل مستقبلاً أفضل.',
    },
    primaryButtonText: {
      en: 'Explore Our Services →',
      ar: 'استكشف خدماتنا ←',
    },
    primaryButtonUrl: '/services',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  },
  aboutSection: {
    tagline: {
      en: 'ABOUT ATTRACTIVE',
      ar: 'عن أتراكتيف',
    },
    title: {
      en: 'More Than a Company, A Platform for Sustainable Growth.',
      ar: 'أكثر من مجرد شركة، منصة للنمو المستدام.',
    },
    description: {
      en: 'Attractive drives excellence across healthcare, advanced equipment, and modern commerce. We forge enduring partnerships and implement state-of-the-art technological solutions that elevate everyday life and drive organizational growth.',
      ar: 'تقود أتراكتيف التميز عبر الرعاية الصحية والمعدات المتقدمة والتجارة الحديثة. نحن نبني شراكات دائمة ونطبق حلولاً تكنولوجية متطورة ترتقي بالحياة اليومية وتدفع النمو المؤسسي.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  workTogetherSection: {
    tagline: {
      en: "— LET'S WORK TOGETHER —",
      ar: '— لنعمل معاً —',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Partner with Attractive to innovate and deliver cutting-edge solutions across modern enterprise and healthcare sectors.',
      ar: 'شارك أتراكتيف للابتكار وتقديم حلول متطورة عبر قطاعات الأعمال الحديثة والرعاية الصحية.',
    },
    primaryButtonText: {
      en: 'Get a Quote ↗',
      ar: 'احصل على عرض أسعار ↗',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const getCmsAttractive = async (req: Request, res: Response) => {
  try {
    let cmsData = await CmsAttractive.findOne();
    if (!cmsData) {
      cmsData = await CmsAttractive.create(defaultCmsAttractiveData);
    } else if (!cmsData.colorTheme) {
      cmsData.colorTheme = defaultCmsAttractiveData.colorTheme;
      await cmsData.save();
    }

    if (cmsData.get('productsSection') !== undefined) {
      await CmsAttractive.updateOne(
        { _id: cmsData._id },
        { $unset: { productsSection: '' } }
      );
      cmsData = (await CmsAttractive.findById(cmsData._id)) || cmsData;
    }

    const responseData = cmsData.toObject();
    delete (responseData as any).productsSection;

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error('Error fetching CMS Attractive data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Attractive data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateCmsAttractive = async (req: Request, res: Response) => {
  try {
    const { productsSection: _ignored, ...updateData } = req.body || {};
    const incomingColorTheme = updateData.colorTheme ?? updateData.color;
    let cmsData = await CmsAttractive.findOne();

    if (!cmsData) {
      cmsData = await CmsAttractive.create({
        ...defaultCmsAttractiveData,
        ...updateData,
        colorTheme: incomingColorTheme || defaultCmsAttractiveData.colorTheme,
      });
    } else {
      if (incomingColorTheme) {
        cmsData.colorTheme = incomingColorTheme;
      }
      if (updateData.heroBannerSection) {
        cmsData.heroBannerSection = {
          ...cmsData.heroBannerSection,
          ...updateData.heroBannerSection,
        };
      }
      if (updateData.aboutSection) {
        cmsData.aboutSection = {
          ...cmsData.aboutSection,
          ...updateData.aboutSection,
        };
      }
      if (updateData.workTogetherSection) {
        cmsData.workTogetherSection = {
          ...cmsData.workTogetherSection,
          ...updateData.workTogetherSection,
        };
      }
      await cmsData.save();
      if (cmsData.get('productsSection') !== undefined) {
        await CmsAttractive.updateOne(
          { _id: cmsData._id },
          { $unset: { productsSection: '' } }
        );
      }
    }

    const responseData = cmsData.toObject();
    delete (responseData as any).productsSection;

    res.json({
      success: true,
      message: 'CMS Attractive data updated successfully',
      data: responseData,
    });
  } catch (error) {
    console.error('Error updating CMS Attractive data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Attractive data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

