import { Request, Response } from 'express';
import CmsMedicsInnovator, { ICmsMedicsInnovator } from '../models/CmsMedicsInnovator';

export const defaultCmsMedicsInnovatorData = {
  colorTheme: 'red',
  heroBannerSection: {
    logoUrl: '',
    logoText: {
      en: 'MEDICS INNOVATOR',
      ar: 'ميديكس إنوفيتور',
    },
    title: {
      en: 'Advancing Healthcare',
      ar: 'الارتقاء بالرعاية الصحية',
    },
    titleHighlight: {
      en: 'Through Innovation',
      ar: 'من خلال الابتكار',
    },
    description: {
      en: 'Supplying globally certified medical equipment, diagnostics, and clinical technologies to support modern healthcare facilities and improve lives.',
      ar: 'توريد أجهزة طبية معتمدة عالمياً وحلول تشخيصية وتقنيات سريرية لدعم المرافق الصحية الحديثة وتحسين جودة الحياة.',
    },
    primaryButtonText: {
      en: 'Explore Our Products →',
      ar: 'استكشف منتجاتنا ←',
    },
    primaryButtonUrl: '/shop',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
  },
  aboutSection: {
    tagline: {
      en: 'ABOUT MEDICS INNOVATOR',
      ar: 'عن ميديكس إنوفيتور',
    },
    title: {
      en: 'More Than a Medical Provider, A Partner in Clinical Excellence.',
      ar: 'أكثر من مجرد مزود طبي، شريك في التميز السريري.',
    },
    description: {
      en: 'Medics Innovator specializes in delivering certified medical equipment, clinical instrumentation, and hospital infrastructure solutions. We work directly with leading global manufacturers to ensure healthcare providers achieve maximum precision and patient safety.',
      ar: 'تتخصص ميديكس إنوفيتور في تقديم المعدات الطبية المعتمدة والأجهزة السريرية وحلول البنية التحتية للمستشفيات. نعمل مباشرة مع كبرى الشركات المصنعة عالمياً لضمان تحقيق مقدمي الرعاية لأعلى مستويات الدقة وسلامة المرضى.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
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
      en: 'Partner with Medics Innovator to equip your medical facility with world-class clinical technologies and trusted supplies.',
      ar: 'تشارك مع ميديكس إنوفيتور لتجهيز منشأتك الطبية بأحدث التقنيات السريرية العالمية والإمدادات الموثوقة.',
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

export const getCmsMedicsInnovator = async (req: Request, res: Response) => {
  try {
    let cmsData = await CmsMedicsInnovator.findOne();
    if (!cmsData) {
      cmsData = await CmsMedicsInnovator.create(defaultCmsMedicsInnovatorData);
    } else if (!cmsData.colorTheme) {
      cmsData.colorTheme = defaultCmsMedicsInnovatorData.colorTheme;
      await cmsData.save();
    }

    if (cmsData.get('productsSection') !== undefined) {
      await CmsMedicsInnovator.updateOne(
        { _id: cmsData._id },
        { $unset: { productsSection: '' } }
      );
      cmsData = (await CmsMedicsInnovator.findById(cmsData._id)) || cmsData;
    }

    const responseData = cmsData.toObject();
    delete (responseData as any).productsSection;

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error('Error fetching CMS Medics Innovator data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Medics Innovator data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateCmsMedicsInnovator = async (req: Request, res: Response) => {
  try {
    const { productsSection: _ignored, ...updateData } = req.body || {};
    const incomingColorTheme = updateData.colorTheme ?? updateData.color;
    let cmsData = await CmsMedicsInnovator.findOne();

    if (!cmsData) {
      cmsData = await CmsMedicsInnovator.create({
        ...defaultCmsMedicsInnovatorData,
        ...updateData,
        colorTheme: incomingColorTheme || defaultCmsMedicsInnovatorData.colorTheme,
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
        await CmsMedicsInnovator.updateOne(
          { _id: cmsData._id },
          { $unset: { productsSection: '' } }
        );
      }
    }

    const responseData = cmsData.toObject();
    delete (responseData as any).productsSection;

    res.json({
      success: true,
      message: 'CMS Medics Innovator data updated successfully',
      data: responseData,
    });
  } catch (error) {
    console.error('Error updating CMS Medics Innovator data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Medics Innovator data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

