import { Request, Response } from 'express';
import CmsShop, { IShopProduct } from '../models/CmsShop';

const toProductSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

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
        slug: 'patient-monitor',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        ],
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
        productDescription: {
          en: '<p>A medical monitoring device designed to provide continuous multiparameter monitoring with a user-friendly interface, helping healthcare professionals make faster, more informed clinical decisions.</p><ul><li>High-resolution display for clear waveform visibility</li><li>Multiple parameter monitoring (ECG, SpO2, NIBP, RESP, TEMP)</li><li>Advanced alarm management for patient safety</li><li>Network connectivity (HL7, DICOM)</li><li>Ergonomic and compact clinical design</li></ul>',
          ar: '<p>جهاز مراقبة طبي مصمم لتوفير مراقبة مستمرة متعددة المعايير بواجهة سهلة الاستخدام، مما يساعد المختصين في الرعاية الصحية على اتخاذ قرارات سريرية أسرع وأكثر دقة.</p><ul><li>شاشة عالية الدقة لعرض واضح للموجات الحيوية</li><li>مراقبة متعددة المعايير (ECG, SpO2, NIBP, RESP, TEMP)</li><li>إدارة متقدمة للإنذارات لسلامة المرضى</li><li>اتصال شبكي (HL7, DICOM)</li><li>تصميم سريري مدمج وسهل الاستخدام</li></ul>',
        },
        specifications: [
          { id: 'spec-1-1', label: { en: 'Display', ar: 'الشاشة' }, value: { en: '15.6" TFT LCD', ar: '15.6 بوصة TFT LCD' } },
          { id: 'spec-1-2', label: { en: 'Parameters', ar: 'المعايير' }, value: { en: 'ECG, SpO2, NIBP, RESP, TEMP', ar: 'ECG, SpO2, NIBP, RESP, TEMP' } },
          { id: 'spec-1-3', label: { en: 'Power Supply', ar: 'مصدر الطاقة' }, value: { en: 'AC 100~240V, 50/60Hz', ar: 'AC 100~240V, 50/60Hz' } },
          { id: 'spec-1-4', label: { en: 'Dimensions', ar: 'الأبعاد' }, value: { en: '380 x 280 x 180 mm', ar: '380 × 280 × 180 مم' } },
          { id: 'spec-1-5', label: { en: 'Weight', ar: 'الوزن' }, value: { en: '6.5 kg', ar: '6.5 كجم' } },
        ],
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
        slug: 'digital-ultrasound-system',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        ],
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
        productDescription: {
          en: '<p>A high-definition digital ultrasound imaging platform engineered to deliver exceptional clarity across radiology, cardiology, and point-of-care diagnostics.</p><ul><li>High-resolution color Doppler imaging</li><li>Ergonomic articulated monitor arm</li><li>Multi-transducer probe connectivity</li><li>Integrated DICOM archiving and export</li></ul>',
          ar: '<p>منصة تصوير رقمية عالية الدقة بالموجات فوق الصوتية مصممة لتقديم وضوح استثنائي في الأشعة والقلب والتشخيص السريري.</p><ul><li>تصوير دوبلر ملون عالي الدقة</li><li>ذراع شاشة مرن ومريح</li><li>دعم متعدد لمجسات الفحص</li><li>أرشفة وتصدير متكامل بنظام DICOM</li></ul>',
        },
        specifications: [
          { id: 'spec-2-1', label: { en: 'Display', ar: 'الشاشة' }, value: { en: '21.5" Full HD LED', ar: '21.5 بوصة Full HD LED' } },
          { id: 'spec-2-2', label: { en: 'Imaging Modes', ar: 'أوضاع التصوير' }, value: { en: 'B, M, Color Doppler, PW, CW', ar: 'B, M, دوبلر ملون, PW, CW' } },
          { id: 'spec-2-3', label: { en: 'Probe Ports', ar: 'منافذ المجسات' }, value: { en: '4 Active Ports', ar: '4 منافذ نشطة' } },
          { id: 'spec-2-4', label: { en: 'Power Supply', ar: 'مصدر الطاقة' }, value: { en: 'AC 100~240V, 50/60Hz', ar: 'AC 100~240V, 50/60Hz' } },
        ],
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
        slug: 'infusion-pump',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        ],
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
        productDescription: {
          en: '<p>A precision volumetric infusion pump built for ICU, surgical, and general ward fluid administration with intelligent occlusion detection and drug library safety.</p><ul><li>Micro-precision flow rate control (0.1 – 1200 ml/h)</li><li>Dual-CPU safety monitoring architecture</li><li>Air-in-line and dynamic pressure occlusion detection</li><li>Rechargeable backup battery for patient transport</li></ul>',
          ar: '<p>مضخة حقن وريدي حجمية عالية الدقة مصممة للعناية المركزة وغرف العمليات والأقسام العامة مع كشف ذكي للانسداد ومكتبة أدوية آمنة.</p><ul><li>تحكم دقيق في معدل التدفق (0.1 – 1200 مل/ساعة)</li><li>بنية مراقبة أمان ثنائية المعالج</li><li>كشف فقاعات الهواء وضغط الانسداد الديناميكي</li><li>بطارية احتياطية قابلة لإعادة الشحن لنقل المرضى</li></ul>',
        },
        specifications: [
          { id: 'spec-3-1', label: { en: 'Flow Rate Range', ar: 'نطاق معدل التدفق' }, value: { en: '0.1 – 1200 ml/h', ar: '0.1 – 1200 مل/ساعة' } },
          { id: 'spec-3-2', label: { en: 'Accuracy', ar: 'الدقة' }, value: { en: '±5%', ar: '±5%' } },
          { id: 'spec-3-3', label: { en: 'Battery Life', ar: 'عمر البطارية' }, value: { en: 'Up to 6 hours', ar: 'حتى 6 ساعات' } },
          { id: 'spec-3-4', label: { en: 'Weight', ar: 'الوزن' }, value: { en: '2.1 kg', ar: '2.1 كجم' } },
        ],
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

const normalizeProductForWrite = (raw: Partial<IShopProduct>, index: number): IShopProduct => {
  const cleanedImages = Array.isArray(raw.images)
    ? raw.images.map((url) => String(url || '').trim()).filter(Boolean)
    : [];

  const primaryImage = cleanedImages[0] || String(raw.image || '').trim();
  const images = cleanedImages.length > 0 ? cleanedImages : primaryImage ? [primaryImage] : [];
  const id = raw.id || `prod-${index + 1}`;
  const slug =
    (raw.slug && toProductSlug(raw.slug)) ||
    (raw.name?.en ? toProductSlug(raw.name.en) : '') ||
    toProductSlug(id);

  const specifications = Array.isArray(raw.specifications)
    ? raw.specifications.map((spec, sIdx) => ({
        id: spec?.id || `spec-${Date.now()}-${sIdx}`,
        label: {
          en: String(spec?.label?.en || ''),
          ar: String(spec?.label?.ar || ''),
        },
        value: {
          en: String(spec?.value?.en || ''),
          ar: String(spec?.value?.ar || ''),
        },
      }))
    : [];

  return {
    id,
    slug,
    image: primaryImage,
    images,
    brand: {
      en: String(raw.brand?.en || ''),
      ar: String(raw.brand?.ar || ''),
    },
    name: {
      en: String(raw.name?.en || ''),
      ar: String(raw.name?.ar || ''),
    },
    description: {
      en: String(raw.description?.en || ''),
      ar: String(raw.description?.ar || ''),
    },
    productDescription: {
      en: String(raw.productDescription?.en || ''),
      ar: String(raw.productDescription?.ar || ''),
    },
    specifications,
    badges: Array.isArray(raw.badges)
      ? raw.badges.map((b, bIdx) => ({
          id: b?.id || `b-${Date.now()}-${bIdx}`,
          en: String(b?.en || ''),
          ar: String(b?.ar || ''),
        }))
      : [],
    buttonText: {
      en: String(raw.buttonText?.en || 'Request a Quote'),
      ar: String(raw.buttonText?.ar || 'طلب عرض أسعار'),
    },
    buttonUrl: String(raw.buttonUrl || '/contact'),
  };
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
        } else {
          shopDoc.headerSection.products = shopDoc.headerSection.products.map((prod, idx) => {
            const defaultMatch = defaultCmsShopData.headerSection.products.find((d) => d.id === prod.id);
            const rawObj = typeof (prod as any).toObject === 'function' ? (prod as any).toObject() : prod;

            const existingImages = Array.isArray(rawObj.images)
              ? rawObj.images.map((u: string) => String(u || '').trim()).filter(Boolean)
              : [];
            let nextImages = existingImages;
            if (existingImages.length === 0) {
              if (rawObj.image) {
                nextImages = defaultMatch?.images?.length ? defaultMatch.images : [rawObj.image];
              }
              modified = true;
            }

            let nextSlug = rawObj.slug;
            if (!nextSlug) {
              nextSlug = defaultMatch?.slug || toProductSlug(rawObj.name?.en || '') || rawObj.id || `prod-${idx + 1}`;
              modified = true;
            }

            let nextProductDesc = rawObj.productDescription;
            if (!nextProductDesc || (!nextProductDesc.en && !nextProductDesc.ar)) {
              if (defaultMatch?.productDescription) {
                nextProductDesc = defaultMatch.productDescription;
                modified = true;
              } else if (rawObj.description?.en || rawObj.description?.ar) {
                nextProductDesc = {
                  en: rawObj.description?.en ? `<p>${rawObj.description.en}</p>` : '',
                  ar: rawObj.description?.ar ? `<p>${rawObj.description.ar}</p>` : '',
                };
                modified = true;
              } else {
                nextProductDesc = { en: '', ar: '' };
              }
            }

            let nextSpecs = rawObj.specifications;
            if (!Array.isArray(nextSpecs) || (nextSpecs.length === 0 && defaultMatch?.specifications?.length)) {
              if (!Array.isArray(rawObj.specifications) || rawObj.specifications.length === 0) {
                nextSpecs = defaultMatch?.specifications || [];
                if (nextSpecs.length > 0) modified = true;
              }
            }

            return {
              ...rawObj,
              slug: nextSlug,
              image: nextImages[0] || rawObj.image || '',
              images: nextImages,
              productDescription: nextProductDesc,
              specifications: nextSpecs || [],
            };
          });
        }
      }

      if (modified) {
        shopDoc.markModified('headerSection');
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

// GET /api/cms/shop/products/:idOrSlug
export const getShopProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const idOrSlug = String(req.params.idOrSlug || '').trim().toLowerCase();
    let shopDoc = await CmsShop.findOne();

    if (!shopDoc) {
      shopDoc = new CmsShop(defaultCmsShopData);
      await shopDoc.save();
    }

    const products = shopDoc.headerSection?.products || [];
    const product = products.find((p, idx) => {
      const slug = (p.slug || toProductSlug(p.name?.en || '') || p.id || `prod-${idx + 1}`).toLowerCase();
      return slug === idOrSlug || String(p.id || '').toLowerCase() === idOrSlug;
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error('Error fetching Shop product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Shop product',
      error: error.message,
    });
  }
};

// PUT /api/cms/shop or POST /api/cms/shop
export const updateCmsShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let shopDoc = await CmsShop.findOne();

    const incomingHeader = updateData?.headerSection
      ? {
          ...updateData.headerSection,
          products: Array.isArray(updateData.headerSection.products)
            ? updateData.headerSection.products.map((p: Partial<IShopProduct>, idx: number) =>
                normalizeProductForWrite(p, idx)
              )
            : undefined,
        }
      : undefined;

    if (!shopDoc) {
      shopDoc = new CmsShop({
        ...defaultCmsShopData,
        ...updateData,
        ...(incomingHeader
          ? {
              headerSection: {
                ...defaultCmsShopData.headerSection,
                ...incomingHeader,
              },
            }
          : {}),
      });
    } else if (incomingHeader) {
      shopDoc.headerSection = {
        ...shopDoc.headerSection,
        ...incomingHeader,
        products: incomingHeader.products ?? shopDoc.headerSection.products,
      };
      shopDoc.markModified('headerSection');
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
