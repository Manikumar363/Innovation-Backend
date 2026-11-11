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
    res.json({
      success: true,
      data: cmsData,
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
    const updateData = req.body;
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
      message: 'CMS Attractive data updated successfully',
      data: cmsData,
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

