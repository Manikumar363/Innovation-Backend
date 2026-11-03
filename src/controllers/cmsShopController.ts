import { Request, Response } from 'express';
import CmsShop from '../models/CmsShop';

export const defaultCmsShopData = {
  headerSection: {
    title: {
      en: 'Our Products',
      ar: 'منتجاتنا',
    },
    description: {
      en: 'Explore our range of medical equipment and healthcare solutions. Contact our team to request a quote tailored to your requirements.',
      ar: 'استكشف مجموعتنا من المعدات الطبية والحلول الصحية. تواصل مع فريقنا لطلب عرض أسعار مصمم خصيصاً لاحتياجاتك.',
    },
    products: [
      {
        id: 'prod-1',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
        brand: {
          en: 'MedTech',
          ar: 'ميدتك',
        },
        name: {
          en: 'Patient Monitor',
          ar: 'شاشة مراقبة المريض',
        },
        description: {
          en: 'A medical monitoring device designed to track vital signs and support patient observation in clinical environments.',
          ar: 'جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم ملاحظة المريض في البيئات السريرية.',
        },
        badges: [
          { id: 'b1-1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b1-2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
          { id: 'b1-3', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: {
          en: 'Request a Quote',
          ar: 'طلب عرض أسعار',
        },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-2',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
        brand: {
          en: 'SonoCare',
          ar: 'سونوكير',
        },
        name: {
          en: 'Digital Ultrasound System',
          ar: 'نظام الموجات فوق الصوتية الرقمي',
        },
        description: {
          en: 'An ultrasound imaging system designed to support diagnostic examinations in hospitals and healthcare facilities.',
          ar: 'نظام تصوير بالموجات فوق الصوتية مصمم لدعم الفحوصات التشخيصية في المستشفيات والمنشآت الصحية.',
        },
        badges: [
          { id: 'b2-1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b2-2', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: {
          en: 'Request a Quote',
          ar: 'طلب عرض أسعار',
        },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-3',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
        brand: {
          en: 'CareFlow',
          ar: 'كيرفلو',
        },
        name: {
          en: 'Infusion Pump',
          ar: 'مضخة الحقن الوريدي',
        },
        description: {
          en: 'A medical device designed for the controlled delivery of fluids and medications in clinical settings.',
          ar: 'جهاز طبي مصمم للحقن الدقيق والمتحكم فيه للسوائل والأدوية في البيئات السريرية.',
        },
        badges: [
          { id: 'b3-1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b3-2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
        ],
        buttonText: {
          en: 'Request a Quote',
          ar: 'طلب عرض أسعار',
        },
        buttonUrl: '/contact',
      },
    ],
  },
};

// GET /api/cms/shop
export const getCmsShop = async (_req: Request, res: Response): Promise<void> => {
  try {
    let shopDoc = await CmsShop.findOne();

    if (!shopDoc) {
      shopDoc = new CmsShop(defaultCmsShopData);
      await shopDoc.save();
    } else {
      let modified = false;

      // Migrate header section
      if (!shopDoc.headerSection) {
        shopDoc.headerSection = defaultCmsShopData.headerSection;
        modified = true;
      } else {
        if (!shopDoc.headerSection.title || (!shopDoc.headerSection.title.en && !shopDoc.headerSection.title.ar)) {
          shopDoc.headerSection.title = defaultCmsShopData.headerSection.title;
          modified = true;
        }
        if (!shopDoc.headerSection.description || (!shopDoc.headerSection.description.en && !shopDoc.headerSection.description.ar)) {
          shopDoc.headerSection.description = defaultCmsShopData.headerSection.description;
          modified = true;
        }
        if (!shopDoc.headerSection.products || shopDoc.headerSection.products.length === 0) {
          shopDoc.headerSection.products = defaultCmsShopData.headerSection.products;
          modified = true;
        }
      }

      if (modified) {
        await shopDoc.save();
      }
    }

    res.status(200).json({
      success: true,
      data: shopDoc,
    });
  } catch (error: any) {
    console.error('Error fetching CMS Shop:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Shop data',
      error: error.message,
    });
  }
};

// PUT /api/cms/shop or POST /api/cms/shop
export const updateCmsShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let shopDoc = await CmsShop.findOne();

    if (!shopDoc) {
      shopDoc = new CmsShop({
        ...defaultCmsShopData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        shopDoc.headerSection = {
          ...shopDoc.headerSection,
          ...updateData.headerSection,
        };
      }
    }

    await shopDoc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Shop updated successfully',
      data: shopDoc,
    });
  } catch (error: any) {
    console.error('Error updating CMS Shop:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Shop data',
      error: error.message,
    });
  }
};

