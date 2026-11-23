import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import CmsShop, { IShopProduct, IShopProductBadge, IShopProductSpecification } from '../models/CmsShop';

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

// Helper: match cell keys case-insensitively
const getCell = (row: Record<string, any>, ...keys: string[]): string => {
  const rowKeys = Object.keys(row);
  for (const targetKey of keys) {
    const targetNorm = targetKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const rk of rowKeys) {
      const rkNorm = rk.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (rkNorm === targetNorm && row[rk] !== undefined && row[rk] !== null) {
        return String(row[rk]).trim();
      }
    }
  }
  return '';
};

// Helper: ensure clean HTML content
const toCleanHtml = (text: string): string => {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }
  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const bulletLines: string[] = [];
  const paragraphs: string[] = [];
  for (const line of lines) {
    if (/^[-*•]\s*/.test(line)) {
      bulletLines.push(line.replace(/^[-*•]\s*/, ''));
    } else {
      if (bulletLines.length > 0) {
        paragraphs.push(`<ul>${bulletLines.map((b) => `<li>${b}</li>`).join('')}</ul>`);
        bulletLines.length = 0;
      }
      paragraphs.push(`<p>${line}</p>`);
    }
  }
  if (bulletLines.length > 0) {
    paragraphs.push(`<ul>${bulletLines.map((b) => `<li>${b}</li>`).join('')}</ul>`);
  }
  return paragraphs.join('');
};

// Parse Excel buffer into IShopProduct[]
export const parseShopExcelBuffer = (buffer: Buffer): Partial<IShopProduct>[] => {
  const wb = XLSX.read(buffer, { type: 'buffer' });
  if (!wb.SheetNames || wb.SheetNames.length === 0) {
    throw new Error('Excel workbook has no sheets');
  }
  const sheetName = wb.SheetNames.find((s) => /products/i.test(s)) || wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`);
  }
  const rows: Array<Record<string, any>> = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  const products: Partial<IShopProduct>[] = [];

  rows.forEach((row, idx) => {
    const nameEn = getCell(
      row,
      'Product name (EN) *',
      'Product name (EN)',
      'Product Name (English) *',
      'Product Name',
      'name_en',
      'nameEn',
      'Name'
    );
    const nameAr = getCell(
      row,
      'Product name (AR)',
      'Product Name (Arabic) *',
      'Product Name (Arabic)',
      'name_ar',
      'nameAr',
      'اسم المنتج'
    );
    if (!nameEn && !nameAr) return;

    const brandEn = getCell(
      row,
      'Brand / Manufacturer *',
      'Brand / Manufacturer',
      'Brand / Category (English)',
      'Brand',
      'brand_en'
    );
    const brandAr = getCell(row, 'Brand / Category (Arabic)', 'brand_ar', 'العلامة التجارية');
    const customSlug = getCell(
      row,
      'SKU *',
      'SKU',
      'Product Slug (Optional)',
      'slug',
      'Product Slug'
    );
    const shortDescEn = getCell(
      row,
      'Short description (EN) * (max 160 characters)',
      'Short description (EN)',
      'Short Summary (English)',
      'short_description_en',
      'description_en',
      'Summary'
    );
    const shortDescAr = getCell(
      row,
      'Short description (AR)',
      'Short Summary (Arabic)',
      'short_description_ar',
      'الوصف'
    );
    const htmlEnRaw = getCell(
      row,
      'Full description (EN)',
      'Detailed Description HTML (English)',
      'product_description_html_en',
      'productDescription_en'
    );
    const htmlArRaw = getCell(
      row,
      'Detailed Description HTML (Arabic)',
      'product_description_html_ar',
      'productDescription_ar'
    );
    const primaryImg = getCell(row, 'Primary Image URL', 'primary_image_url', 'image');
    const imageNamesRaw = getCell(
      row,
      'Image file names (comma separated) *',
      'Image file names',
      'Additional Image URLs (Comma-separated)',
      'images'
    );
    const additionalImgs = (imageNamesRaw || '')
      .split(/[,|\n]/)
      .map((u) => u.trim())
      .filter(Boolean);
    const allImages = [
      ...(primaryImg ? [primaryImg] : []),
      ...additionalImgs.filter((u) => u !== primaryImg),
    ];

    const specsEnRaw = getCell(
      row,
      'Key specifications (EN) (one per line)',
      'Key Specifications (English) [Label: Value | Label: Value]',
      'specifications_en',
      'specs_en'
    );
    const specsArRaw = getCell(
      row,
      'Key Specifications (Arabic) [Label: Value | Label: Value]',
      'specifications_ar',
      'specs_ar'
    );
    const parseSpecs = (raw: string) =>
      (raw || '')
        .split(/\r?\n|\|/)
        .map((t) => {
          const c = t.indexOf(':');
          return c === -1
            ? { label: t.trim(), value: '' }
            : { label: t.slice(0, c).trim(), value: t.slice(c + 1).trim() };
        })
        .filter((s) => s.label || s.value);
    const enSpecs = parseSpecs(specsEnRaw);
    const arSpecs = parseSpecs(specsArRaw);
    const maxSpec = Math.max(enSpecs.length, arSpecs.length);
    const specifications: IShopProductSpecification[] = [];
    for (let i = 0; i < maxSpec; i++) {
      const e = enSpecs[i] || { label: '', value: '' };
      const a = arSpecs[i] || { label: e.label, value: e.value };
      if (!e.label && !e.value && !a.label && !a.value) continue;
      specifications.push({
        id: `spec-${Date.now()}-${i + 1}`,
        label: { en: e.label, ar: a.label || e.label },
        value: { en: e.value, ar: a.value || e.value },
      });
    }

    // Auxiliary specs
    const origin = getCell(row, 'Country of origin');
    if (origin && !specifications.some((s) => /country/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-origin`,
        label: { en: 'Country of Origin', ar: 'بلد المنشأ' },
        value: { en: origin, ar: origin },
      });
    }

    const warranty = getCell(row, 'Warranty / after-sales (EN)');
    if (warranty && !specifications.some((s) => /warranty/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-warranty`,
        label: { en: 'Warranty', ar: 'الضمان' },
        value: { en: warranty, ar: warranty },
      });
    }

    const badgesEnRaw = getCell(
      row,
      'Certifications (CE / FDA / ISO / other)',
      'Certification Badges (English) [Comma-separated]',
      'badges_en',
      'Badges'
    );
    const badgesArRaw = getCell(
      row,
      'Certification Badges (Arabic) [Comma-separated]',
      'badges_ar',
      'الشهادات'
    );
    const enBadges = (badgesEnRaw || '').split(/[,|\n]/).map((b) => b.trim()).filter(Boolean);
    const arBadges = (badgesArRaw || '').split(/[,|\n]/).map((b) => b.trim()).filter(Boolean);
    const maxBadges = Math.max(enBadges.length, arBadges.length);
    const badges: IShopProductBadge[] = [];
    for (let i = 0; i < maxBadges; i++) {
      const e = enBadges[i] || '';
      const a = arBadges[i] || e;
      if (!e && !a) continue;
      badges.push({ id: `badge-${Date.now()}-${i + 1}`, en: e, ar: a });
    }

    const btnTextEn = getCell(row, 'Button Text (English)', 'button_text_en') || 'Request a Quote';
    const btnTextAr = getCell(row, 'Button Text (Arabic)', 'button_text_ar') || 'طلب عرض أسعار';
    const btnUrl = getCell(row, 'Button Link URL', 'button_url') || '/contact';

    products.push({
      id: `prod-${Date.now()}-${idx + 1}`,
      slug: customSlug
        ? toProductSlug(customSlug)
        : nameEn
        ? toProductSlug(nameEn)
        : `prod-${Date.now()}-${idx + 1}`,
      image: allImages[0] || '',
      images: allImages,
      brand: { en: brandEn, ar: brandAr || brandEn },
      name: { en: nameEn || nameAr, ar: nameAr || nameEn },
      description: { en: shortDescEn, ar: shortDescAr || shortDescEn },
      productDescription: {
        en: toCleanHtml(htmlEnRaw || shortDescEn),
        ar: toCleanHtml(htmlArRaw || shortDescAr || htmlEnRaw || shortDescEn),
      },
      specifications,
      badges,
      buttonText: { en: btnTextEn, ar: btnTextAr },
      buttonUrl: btnUrl,
    });
  });

  return products;
};

// GET /api/cms/shop/excel-template
export const downloadShopProductsTemplate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const withSample = req.query.sample !== 'false';

    const sampleRows = [
      {
        'SKU *': 'MED-MON-001',
        'Shop section *': 'Medical Equipment',
        'Category *': 'Patient Monitoring',
        'Product name (EN) *': 'Philips IntelliVue MX550 Patient Monitor',
        'Product name (AR)': 'شاشة مراقبة المريض فيليبس إنتيليفيو MX550',
        'Brand / Manufacturer *': 'Philips Healthcare',
        'Country of origin': 'Germany',
        'Short description (EN) * (max 160 characters)':
          'Advanced bedside vital signs monitoring solution for high-acuity care units and emergency rooms.',
        'Short description (AR)':
          'جهاز مراقبة متقدم للعلامات الحيوية بجانب السرير لوحدات العناية المركزة والطوارئ.',
        'Full description (EN)':
          'The IntelliVue MX550 provides advanced monitoring capabilities with a user-friendly interface, helping healthcare professionals make faster, more informed decisions. It is suitable for adult, pediatric, and neonatal patients.\n\n- 15.6" high-resolution display\n- Multiple parameter monitoring (ECG, SpO2, NIBP, RESP, TEMP)\n- Advanced alarm management\n- Network connectivity (HL7, DICOM)\n- Ergonomic and compact design',
        'Key specifications (EN) (one per line)':
          'Display: 15.6" TFT LCD\nParameters: ECG, SpO2, NIBP, RESP, TEMP\nPower Supply: AC 100~240V, 50/60Hz\nDimensions: 380 x 280 x 180 mm\nWeight: 6.5 kg',
        'Certifications (CE / FDA / ISO / other)': 'CE Certified, FDA Registered, ISO 13485',
        'Product type *': 'Quote Only',
        'Price (USD) — Fixed Price only': '',
        'Verification required? *': 'Yes',
        'MOH registration no. (pharma only)': 'MOH-MED-2024-8842',
        'Generic name (pharma only)': 'Multi-Parameter Patient Monitor',
        'Dosage form / strength (pharma only)': 'N/A',
        'Warranty / after-sales (EN)': '2 Years Manufacturer Warranty & 24/7 Technical Support',
        'Image file names (comma separated) *':
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'Datasheet file name': 'philips-mx550-datasheet.pdf',
        'Notes': 'Requires hospital installation and calibration.',
      },
      {
        'SKU *': 'MED-ULT-002',
        'Shop section *': 'Medical Equipment',
        'Category *': 'Ultrasound & Diagnostics',
        'Product name (EN) *': 'Digital Ultrasound Diagnostic System',
        'Product name (AR)': 'نظام الموجات فوق الصوتية الرقمي التشخيصي',
        'Brand / Manufacturer *': 'SonoCare Medical',
        'Country of origin': 'Japan',
        'Short description (EN) * (max 160 characters)':
          'A versatile digital ultrasound imaging system for clinical diagnostics and bedside examinations.',
        'Short description (AR)':
          'نظام تصوير رقمي متعدد الاستخدامات بالموجات فوق الصوتية للتشخيص السريري وفحوصات المرضى.',
        'Full description (EN)':
          'Engineered for high-clarity diagnostic imaging across cardiology, radiology, and point-of-care environments.\n\n- 21.5" Full HD LED articulated monitor\n- 4 active transducer probe ports\n- Color Doppler, PW, and CW imaging modes',
        'Key specifications (EN) (one per line)':
          'Display: 21.5" Full HD LED\nImaging Modes: B, M, Color Doppler, PW, CW\nProbe Ports: 4 Active Ports\nPower Supply: AC 100~240V, 50/60Hz\nWeight: 75 kg',
        'Certifications (CE / FDA / ISO / other)': 'CE Certified, ISO 9001, ISO 13485',
        'Product type *': 'Quote Only',
        'Price (USD) — Fixed Price only': '',
        'Verification required? *': 'Yes',
        'MOH registration no. (pharma only)': 'MOH-MED-2023-1120',
        'Generic name (pharma only)': 'Color Doppler Ultrasound System',
        'Dosage form / strength (pharma only)': 'N/A',
        'Warranty / after-sales (EN)': '3 Years On-site Warranty & Calibration Included',
        'Image file names (comma separated) *':
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'Datasheet file name': 'sonocare-specs.pdf',
        'Notes': 'Standard probe package included.',
      },
    ];

    const blankRow = {
      'SKU *': '',
      'Shop section *': '',
      'Category *': '',
      'Product name (EN) *': '',
      'Product name (AR)': '',
      'Brand / Manufacturer *': '',
      'Country of origin': '',
      'Short description (EN) * (max 160 characters)': '',
      'Short description (AR)': '',
      'Full description (EN)': '',
      'Key specifications (EN) (one per line)': '',
      'Certifications (CE / FDA / ISO / other)': '',
      'Product type *': 'Quote Only',
      'Price (USD) — Fixed Price only': '',
      'Verification required? *': 'Yes',
      'MOH registration no. (pharma only)': '',
      'Generic name (pharma only)': '',
      'Dosage form / strength (pharma only)': '',
      'Warranty / after-sales (EN)': '',
      'Image file names (comma separated) *': '',
      'Datasheet file name': '',
      'Notes': '',
    };

    const templateRows = withSample ? sampleRows : [blankRow];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(templateRows);
    ws['!cols'] = [
      { wch: 18 }, // A: SKU *
      { wch: 22 }, // B: Shop section *
      { wch: 22 }, // C: Category *
      { wch: 38 }, // D: Product name (EN) *
      { wch: 32 }, // E: Product name (AR)
      { wch: 26 }, // F: Brand / Manufacturer *
      { wch: 20 }, // G: Country of origin
      { wch: 45 }, // H: Short description (EN) * (max 160 characters)
      { wch: 35 }, // I: Short description (AR)
      { wch: 55 }, // J: Full description (EN)
      { wch: 55 }, // K: Key specifications (EN) (one per line)
      { wch: 38 }, // L: Certifications (CE / FDA / ISO / other)
      { wch: 20 }, // M: Product type *
      { wch: 32 }, // N: Price (USD) — Fixed Price only
      { wch: 24 }, // O: Verification required? *
      { wch: 35 }, // P: MOH registration no. (pharma only)
      { wch: 30 }, // Q: Generic name (pharma only)
      { wch: 35 }, // R: Dosage form / strength (pharma only)
      { wch: 35 }, // S: Warranty / after-sales (EN)
      { wch: 45 }, // T: Image file names (comma separated) *
      { wch: 25 }, // U: Datasheet file name
      { wch: 30 }, // V: Notes
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Products Template');

    const instructions = [
      {
        Column: 'A',
        Field: 'SKU *',
        Required: 'YES',
        Description: 'Unique product SKU or code (used to generate URL slug).',
        Example: 'MED-MON-001',
      },
      {
        Column: 'B',
        Field: 'Shop section *',
        Required: 'YES',
        Description: 'Shop section division (e.g. Medical Equipment, Lab Supplies).',
        Example: 'Medical Equipment',
      },
      {
        Column: 'C',
        Field: 'Category *',
        Required: 'YES',
        Description: 'Product category taxonomy.',
        Example: 'Patient Monitoring',
      },
      {
        Column: 'D',
        Field: 'Product name (EN) *',
        Required: 'YES',
        Description: 'Official English commercial name of the product.',
        Example: 'Philips IntelliVue MX550 Patient Monitor',
      },
      {
        Column: 'E',
        Field: 'Product name (AR)',
        Required: 'Recommended',
        Description: 'Arabic name of the product (defaults to English if empty).',
        Example: 'شاشة مراقبة المريض فيليبس إنتيليفيو MX550',
      },
      {
        Column: 'F',
        Field: 'Brand / Manufacturer *',
        Required: 'YES',
        Description: 'Manufacturer or brand name.',
        Example: 'Philips Healthcare',
      },
      {
        Column: 'G',
        Field: 'Country of origin',
        Required: 'Optional',
        Description: 'Country where the equipment is manufactured.',
        Example: 'Germany / Japan',
      },
      {
        Column: 'H',
        Field: 'Short description (EN) * (max 160 characters)',
        Required: 'YES',
        Description: 'Short 1-2 sentence overview for catalog cards (max 160 chars).',
        Example: 'Advanced vital signs monitoring for high-acuity care units.',
      },
      {
        Column: 'I',
        Field: 'Short description (AR)',
        Required: 'Optional',
        Description: 'Short Arabic overview description.',
        Example: 'جهاز مراقبة متقدم للعلامات الحيوية بجانب السرير.',
      },
      {
        Column: 'J',
        Field: 'Full description (EN)',
        Required: 'Recommended',
        Description: 'Full detailed product description (paragraphs or bullet points).',
        Example: 'Provides advanced clinical monitoring capabilities...\n- High-resolution display',
      },
      {
        Column: 'K',
        Field: 'Key specifications (EN) (one per line)',
        Required: 'Recommended',
        Description: 'One specification per line in "Label: Value" format.',
        Example: 'Display: 15.6" LCD\nPower: AC 100~240V\nWeight: 6.5 kg',
      },
      {
        Column: 'L',
        Field: 'Certifications (CE / FDA / ISO / other)',
        Required: 'Optional',
        Description: 'Certifications and regulatory badges separated by commas.',
        Example: 'CE Certified, FDA Registered, ISO 13485',
      },
      {
        Column: 'M',
        Field: 'Product type *',
        Required: 'YES',
        Description: 'Catalog product type: "Quote Only" or "Fixed Price".',
        Example: 'Quote Only',
      },
      {
        Column: 'N',
        Field: 'Price (USD) — Fixed Price only',
        Required: 'Optional',
        Description: 'Price in USD (only if Product Type is Fixed Price).',
        Example: '4500.00',
      },
      {
        Column: 'O',
        Field: 'Verification required? *',
        Required: 'YES',
        Description: 'Whether administrative verification is required (Yes / No).',
        Example: 'Yes',
      },
      {
        Column: 'P',
        Field: 'MOH registration no. (pharma only)',
        Required: 'Optional',
        Description: 'Ministry of Health registration number (for pharma products).',
        Example: 'MOH-MED-2024-8842',
      },
      {
        Column: 'Q',
        Field: 'Generic name (pharma only)',
        Required: 'Optional',
        Description: 'International generic scientific/device name.',
        Example: 'Multi-Parameter Patient Monitor',
      },
      {
        Column: 'R',
        Field: 'Dosage form / strength (pharma only)',
        Required: 'Optional',
        Description: 'Dosage form or strength (pharma products only).',
        Example: 'N/A',
      },
      {
        Column: 'S',
        Field: 'Warranty / after-sales (EN)',
        Required: 'Optional',
        Description: 'Warranty period and after-sales service terms.',
        Example: '2 Years Manufacturer Warranty',
      },
      {
        Column: 'T',
        Field: 'Image file names (comma separated) *',
        Required: 'YES',
        Description:
          'Image URLs or comma-separated image file names. After import, you can upload actual image files directly using the Edit button on each product!',
        Example: 'https://images.unsplash.com/... OR product-main.jpg, product-side.jpg',
      },
      {
        Column: 'U',
        Field: 'Datasheet file name',
        Required: 'Optional',
        Description: 'Technical PDF datasheet file name or URL.',
        Example: 'product-datasheet.pdf',
      },
      {
        Column: 'V',
        Field: 'Notes',
        Required: 'Optional',
        Description: 'Internal notes or special hospital delivery instructions.',
        Example: 'Requires technical installation.',
      },
    ];

    const wsInstructions = XLSX.utils.json_to_sheet(instructions);
    wsInstructions['!cols'] = [{ wch: 8 }, { wch: 35 }, { wch: 14 }, { wch: 55 }, { wch: 45 }];
    XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions & Field Guide');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const filename = withSample
      ? 'Shop_Products_Bulk_Import_Sample_Template.xlsx'
      : 'Shop_Products_Bulk_Import_Blank_Template.xlsx';

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(buffer);
  } catch (error: any) {
    console.error('Error generating Excel template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate Excel template',
      error: error.message,
    });
  }
};

// POST /api/cms/shop/bulk-import
export const bulkImportShopProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mode = String(req.body.mode || 'append').toLowerCase() === 'replace' ? 'replace' : 'append';
    let incomingProducts: Partial<IShopProduct>[] = [];

    if (req.file && req.file.buffer) {
      incomingProducts = parseShopExcelBuffer(req.file.buffer);
    } else if (Array.isArray(req.body.products)) {
      incomingProducts = req.body.products;
    } else if (req.body.products && typeof req.body.products === 'string') {
      try {
        incomingProducts = JSON.parse(req.body.products);
      } catch {
        res.status(400).json({
          success: false,
          message: 'Invalid products JSON payload provided',
        });
        return;
      }
    }

    if (!Array.isArray(incomingProducts) || incomingProducts.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No valid products found in the upload to import.',
      });
      return;
    }

    let shopDoc = await CmsShop.findOne();
    if (!shopDoc) {
      shopDoc = new CmsShop(defaultCmsShopData);
      await shopDoc.save();
    }

    const existingProducts = shopDoc.headerSection?.products || [];
    const baseIndex = mode === 'replace' ? 0 : existingProducts.length;

    const normalizedNewProducts: IShopProduct[] = incomingProducts
      .filter((p) => (p.name?.en && p.name.en.trim()) || (p.name?.ar && p.name.ar.trim()))
      .map((p, idx) => normalizeProductForWrite(p, baseIndex + idx));

    if (normalizedNewProducts.length === 0) {
      res.status(400).json({
        success: false,
        message: 'All submitted rows were missing required product names.',
      });
      return;
    }

    const finalProducts =
      mode === 'replace'
        ? normalizedNewProducts
        : [...existingProducts, ...normalizedNewProducts];

    shopDoc.headerSection = {
      ...shopDoc.headerSection,
      title: shopDoc.headerSection?.title || defaultCmsShopData.headerSection.title,
      description: shopDoc.headerSection?.description || defaultCmsShopData.headerSection.description,
      products: finalProducts,
    };

    shopDoc.markModified('headerSection');
    await shopDoc.save();

    res.status(200).json({
      success: true,
      message: `Successfully ${mode === 'replace' ? 'replaced catalog with' : 'imported'} ${
        normalizedNewProducts.length
      } products into the database.`,
      count: normalizedNewProducts.length,
      mode,
      data: shopDoc,
    });
  } catch (error: any) {
    console.error('Error during bulk Excel import:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk import products from Excel',
      error: error.message,
    });
  }
};
