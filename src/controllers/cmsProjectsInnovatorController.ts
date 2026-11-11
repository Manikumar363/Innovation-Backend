import { Request, Response } from 'express';
import CmsProjectsInnovator from '../models/CmsProjectsInnovator';

export const defaultCmsProjectsInnovatorData = {
  colorTheme: 'red',
  heroBannerSection: {
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    logoText: {
      en: 'PROJECTS INNOVATOR',
      ar: 'شركة مبتكر المشاريع',
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
      en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
      ar: 'تقديم حلول مبتكرة في البناء والبنية التحتية لتشكيل المساحات الحديثة وبناء مستقبل أفضل.',
    },
    primaryButtonText: {
      en: 'Explore Our Services',
      ar: 'استكشف خدماتنا',
    },
    primaryButtonUrl: '/services',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  },
  aboutSection: {
    tagline: {
      en: 'ABOUT PROJECTS INNOVATOR',
      ar: 'عن مبتكر المشاريع',
    },
    title: {
      en: 'More Than a Company, A Platform for Sustainable Growth.',
      ar: 'أكثر من مجرد شركة، منصة للنمو المستدام.',
    },
    description: {
      en: 'Projects Innovator is the parent and holding entity of Mobtaker Group, operating across multiple sectors including healthcare, construction, trading, and investment. We create value through strategic partnerships, innovation, and a commitment to excellence.',
      ar: 'تعتبر مبتكر المشاريع الكيان القابض والأم لمجموعة مبتكر، وتعمل عبر قطاعات متعددة تشمل الرعاية الصحية، والبناء، والتجارة، والاستثمار. نخلق القيمة من خلال الشراكات الاستراتيجية، والابتكار، والالتزام بالتميز.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  workTogetherSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'دعنا نعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، معدات، حلول دوائية، أو خدمات تجارية؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض أسعار',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

/**
 * GET /api/cms/projects-innovator
 */
export const getCmsProjectsInnovator = async (req: Request, res: Response) => {
  try {
    let cmsData = await CmsProjectsInnovator.findOne();

    if (!cmsData) {
      cmsData = await CmsProjectsInnovator.create(defaultCmsProjectsInnovatorData);
      console.log('Seeded default CMS Projects Innovator data into MongoDB');
    } else if (!cmsData.colorTheme) {
      cmsData.colorTheme = defaultCmsProjectsInnovatorData.colorTheme;
      await cmsData.save();
    }

    if (cmsData.get('businessAreasSection') !== undefined) {
      await CmsProjectsInnovator.updateOne(
        { _id: cmsData._id },
        { $unset: { businessAreasSection: '' } }
      );
      cmsData = (await CmsProjectsInnovator.findById(cmsData._id)) || cmsData;
    }

    const responseData = cmsData.toObject();
    delete (responseData as any).businessAreasSection;

    return res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    console.error('Error fetching CMS Projects Innovator data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve CMS Projects Innovator data',
      error: error.message,
    });
  }
};

/**
 * PUT / POST /api/cms/projects-innovator
 */
export const updateCmsProjectsInnovator = async (req: Request, res: Response) => {
  try {
    const { businessAreasSection: _ignored, ...updateData } = req.body || {};
    const incomingColorTheme = updateData.colorTheme ?? updateData.color;

    let cmsData = await CmsProjectsInnovator.findOne();

    if (!cmsData) {
      cmsData = await CmsProjectsInnovator.create({
        ...defaultCmsProjectsInnovatorData,
        ...updateData,
        colorTheme: incomingColorTheme || defaultCmsProjectsInnovatorData.colorTheme,
      });
    } else {
      if (incomingColorTheme) {
        cmsData.colorTheme = incomingColorTheme;
      }
      if (updateData.heroBannerSection) {
        cmsData.heroBannerSection = updateData.heroBannerSection;
      }
      if (updateData.aboutSection) {
        cmsData.aboutSection = updateData.aboutSection;
      }
      if (updateData.workTogetherSection) {
        cmsData.workTogetherSection = updateData.workTogetherSection;
      }

      await cmsData.save();
      if (cmsData.get('businessAreasSection') !== undefined) {
        await CmsProjectsInnovator.updateOne(
          { _id: cmsData._id },
          { $unset: { businessAreasSection: '' } }
        );
      }
    }

    const responseData = cmsData.toObject();
    delete (responseData as any).businessAreasSection;

    return res.status(200).json({
      success: true,
      message: 'CMS Projects Innovator data updated successfully',
      data: responseData,
    });
  } catch (error: any) {
    console.error('Error updating CMS Projects Innovator data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update CMS Projects Innovator data',
      error: error.message,
    });
  }
};

