import { Request, Response } from 'express';
import CmsMedicsInnovator, { ICmsMedicsInnovator } from '../models/CmsMedicsInnovator';

export const defaultCmsMedicsInnovatorData = {
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
  productsSection: {
    title: {
      en: 'Our Products',
      ar: 'منتجاتنا',
    },
    description: {
      en: 'Explore our range of high-quality medical equipment and solutions designed to meet your needs.',
      ar: 'استكشف مجموعتنا من المعدات والحلول الطبية عالية الجودة والمصممة لتلبية احتياجاتك.',
    },
    products: [
      {
        id: 'prod-1',
        image:
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'MedTech', ar: 'ميدتيك' },
        name: { en: 'Patient Monitor', ar: 'شاشة مراقبة المريض' },
        description: {
          en: 'A medical monitoring device designed to track vital signs and support patient observation in clinical environments.',
          ar: 'جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم مراقبة المرضى في البيئات السريرية.',
        },
        badges: [
          { id: 'b1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
          { id: 'b3', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-2',
        image:
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'SonoCare', ar: 'سونوكير' },
        name: { en: 'Digital Ultrasound System', ar: 'نظام الموجات فوق الصوتية الرقمي' },
        description: {
          en: 'An ultrasound imaging system designed to support diagnostic examinations in hospitals and healthcare facilities.',
          ar: 'نظام تصوير بالموجات فوق الصوتية مصمم لدعم الفحوصات التشخيصية في المستشفيات والمرافق الصحية.',
        },
        badges: [
          { id: 'b4', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b5', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-3',
        image:
          'https://images.unsplash.com/photo-1583912267670-6575ad3726f9?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'CareFlow', ar: 'كيرفلو' },
        name: { en: 'Infusion Pump', ar: 'مضخة التسريب الوريدي' },
        description: {
          en: 'A medical device designed for the controlled delivery of fluids and medications in clinical settings.',
          ar: 'جهاز طبي مصمم للتحكم الدقيق في توصيل السوائل والأدوية في البيئات السريرية.',
        },
        badges: [
          { id: 'b6', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b7', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
    ],
    viewAllButtonText: {
      en: 'View All Products',
      ar: 'عرض جميع المنتجات',
    },
    viewAllButtonUrl: '/shop',
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
    }
    res.json({
      success: true,
      data: cmsData,
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
    const updateData = req.body;
    let cmsData = await CmsMedicsInnovator.findOne();

    if (!cmsData) {
      cmsData = await CmsMedicsInnovator.create({
        ...defaultCmsMedicsInnovatorData,
        ...updateData,
      });
    } else {
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
      if (updateData.productsSection) {
        cmsData.productsSection = {
          ...cmsData.productsSection,
          ...updateData.productsSection,
        };
      }
      if (updateData.workTogetherSection) {
        cmsData.workTogetherSection = {
          ...cmsData.workTogetherSection,
          ...updateData.workTogetherSection,
        };
      }
      await cmsData.save();
    }

    res.json({
      success: true,
      message: 'CMS Medics Innovator data updated successfully',
      data: cmsData,
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

