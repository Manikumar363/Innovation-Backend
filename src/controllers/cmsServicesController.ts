import { Request, Response } from 'express';
import CmsServices from '../models/CmsServices';

export const defaultCmsServicesData = {
  headerSection: {
    title: {
      en: 'Our Services',
      ar: 'خدماتنا',
    },
    description: {
      en: 'Discover our medical equipment, laboratory supplies, and healthcare solutions designed to support healthcare professionals and facilities.',
      ar: 'اكتشف معداتنا الطبية ومستلزمات المختبرات والحلول الصحية المصممة لدعم المتخصصين والمنشآت الصحية.',
    },
    cards: [
      {
        id: 'card-service-1',
        icon: 'Microscope',
        title: {
          en: 'Comprehensive Medical & Laboratory Solutions',
          ar: 'حلول طبية ومخبرية شاملة',
        },
        description: {
          en: 'We provide comprehensive solutions in medical and laboratory equipment and supplies to support healthcare professionals and facilities.',
          ar: 'نقدم حلولاً شاملة في المعدات والمستلزمات الطبية والمخبرية لدعم المتخصصين والمنشآت الصحية.',
        },
      },
      {
        id: 'card-service-2',
        icon: 'Code2',
        title: {
          en: 'Globally Certified Advanced Technologies',
          ar: 'تقنيات متقدمة معتمدة عالمياً',
        },
        description: {
          en: 'We deliver advanced, globally certified technologies that support modern healthcare services and improve quality of life.',
          ar: 'نقدم تقنيات متطورة ومعتمدة دولياً تدعم خدمات الرعاية الصحية الحديثة وتحسن جودة الحياة.',
        },
      },
      {
        id: 'card-service-3',
        icon: 'ShieldCheck',
        title: {
          en: 'International Standards of Quality & Safety',
          ar: 'معايير الجودة والسلامة الدولية',
        },
        description: {
          en: 'We focus on providing certified products that meet international standards for quality, reliability, and safety.',
          ar: 'نركز على توفير منتجات معتمدة تلبي المعايير الدولية للجودة والموثوقية والسلامة.',
        },
      },
      {
        id: 'card-service-4',
        icon: 'Handshake',
        title: {
          en: 'Strategic Healthcare Partnerships',
          ar: 'شراكات استراتيجية في الرعاية الصحية',
        },
        description: {
          en: 'Through partnerships with leading global and local manufacturers, we serve hospitals, clinics, laboratories, and research centers.',
          ar: 'من خلال الشراكات مع كبرى الشركات المصنعة العالمية والمحلية، نخدم المستشفيات والعيادات والمختبرات ومراكز الأبحاث.',
        },
      },
    ],
  },

  businessAreasSection: {
    title: {
      en: 'Our Business Areas',
      ar: 'مجالات أعمالنا',
    },
    description: {
      en: 'Explore the sectors and services that form the Projects Innovator group.',
      ar: 'استكشف القطاعات والخدمات التي تشكل مجموعة مبتكر المشاريع.',
    },
    cards: [
      {
        id: 'card-area-1',
        title: {
          en: 'Medical & Laboratory Equipment',
          ar: 'المعدات الطبية والمخبرية',
        },
        description: {
          en: 'Comprehensive medical device solutions and laboratory testing equipment.',
          ar: 'حلول شاملة للأجهزة الطبية ومعدات الفحص المخبري.',
        },
        shortDescription: {
          en: 'Comprehensive medical device solutions and laboratory testing equipment.',
          ar: 'حلول شاملة للأجهزة الطبية ومعدات الفحص المخبري.',
        },
        bulletPoints: [
          {
            id: 'bp-1-1',
            text: {
              en: 'Diagnostic & imaging devices',
              ar: 'أجهزة التشخيص والتصوير الطبي',
            },
          },
          {
            id: 'bp-1-2',
            text: {
              en: 'Clinical laboratory analyzers',
              ar: 'أجهزة التحليل المخبري السريري',
            },
          },
          {
            id: 'bp-1-3',
            text: {
              en: 'Maintenance & calibration services',
              ar: 'خدمات الصيانة والمعايرة الدورية',
            },
          },
        ],
        linkUrl: '/services/medical-equipment',
      },
      {
        id: 'card-area-2',
        title: {
          en: 'Laboratory Supplies',
          ar: 'المستلزمات المخبرية',
        },
        description: {
          en: 'Reliable laboratory supplies and essential equipment for research, testing, and diagnostic facilities.',
          ar: 'مستلزمات مخبرية موثوقة ومعدات أساسية لمرافق الأبحاث والاختبار والتشخيص.',
        },
        shortDescription: {
          en: 'Reliable laboratory supplies and essential equipment for research, testing, and diagnostic facilities.',
          ar: 'مستلزمات مخبرية موثوقة ومعدات أساسية لمرافق الأبحاث والاختبار والتشخيص.',
        },
        bulletPoints: [
          {
            id: 'bp-2-1',
            text: {
              en: 'Reagents & chemical consumables',
              ar: 'الكواشف والمستهلكات الكيميائية',
            },
          },
          {
            id: 'bp-2-2',
            text: {
              en: 'Specimen collection & storage',
              ar: 'أدوات جمع العينات وحفظها',
            },
          },
          {
            id: 'bp-2-3',
            text: {
              en: 'Safety & protective laboratory wear',
              ar: 'معدات السلامة والوقاية المخبرية',
            },
          },
        ],
        linkUrl: '/services/laboratory-supplies',
      },
      {
        id: 'card-area-3',
        title: {
          en: 'Healthcare Solutions',
          ar: 'حلول الرعاية الصحية',
        },
        description: {
          en: 'Quality healthcare products and solutions designed to support medical professionals and healthcare facilities.',
          ar: 'منتجات وحلول رعاية صحية عالية الجودة مصممة لدعم المتخصصين في المجال الطبي والمرافق الصحية.',
        },
        shortDescription: {
          en: 'Quality healthcare products and solutions designed to support medical professionals and healthcare facilities.',
          ar: 'منتجات وحلول رعاية صحية عالية الجودة مصممة لدعم المتخصصين في المجال الطبي والمرافق الصحية.',
        },
        bulletPoints: [
          {
            id: 'bp-3-1',
            text: {
              en: 'Hospital & clinic turnkey setup',
              ar: 'تجهيز المستشفيات والعيادات بالكامل',
            },
          },
          {
            id: 'bp-3-2',
            text: {
              en: 'Infection control & sterilization',
              ar: 'مكافحة العدوى وأنظمة التعقيم',
            },
          },
          {
            id: 'bp-3-3',
            text: {
              en: 'Healthcare IT & monitoring systems',
              ar: 'أنظمة المراقبة وتكنولوجيا الرعاية الصحية',
            },
          },
        ],
        linkUrl: '/services/healthcare-solutions',
      },
      {
        id: 'card-area-4',
        title: {
          en: 'Quality & Safety Standards',
          ar: 'معايير الجودة والسلامة',
        },
        description: {
          en: 'Products selected with a focus on quality, reliability, and compliance with applicable safety standards.',
          ar: 'منتجات مختارة مع التركيز على الجودة والموثوقية والامتثال لمعايير السلامة المعمول بها.',
        },
        shortDescription: {
          en: 'Products selected with a focus on quality, reliability, and compliance with applicable safety standards.',
          ar: 'منتجات مختارة مع التركيز على الجودة والموثوقية والامتثال لمعايير السلامة المعمول بها.',
        },
        bulletPoints: [
          {
            id: 'bp-4-1',
            text: {
              en: 'ISO & CE certified products',
              ar: 'منتجات حاصلة على شهادات ISO و CE',
            },
          },
          {
            id: 'bp-4-2',
            text: {
              en: 'Regulatory compliance verification',
              ar: 'التحقق من الامتثال للمعايير التنظيمية',
            },
          },
          {
            id: 'bp-4-3',
            text: {
              en: 'Comprehensive warranty & support',
              ar: 'ضمان شامل ودعم فني متكامل',
            },
          },
        ],
        linkUrl: '/services/standards',
      },
    ],
  },
};

const sanitizeServicesDoc = (doc: any) => {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  if (obj.businessAreasSection?.cards && Array.isArray(obj.businessAreasSection.cards)) {
    obj.businessAreasSection.cards = obj.businessAreasSection.cards.map((card: any, idx: number) => {
      const defaultCard = defaultCmsServicesData.businessAreasSection.cards[idx] || {};
      const desc = card.description || card.shortDescription || defaultCard.description || { en: '', ar: '' };
      const shortDesc = card.shortDescription || card.description || defaultCard.shortDescription || desc;
      const bulletPoints = Array.isArray(card.bulletPoints) && card.bulletPoints.length > 0
        ? card.bulletPoints.map((bp: any, bIdx: number) => ({
            id: bp.id || `bp-${bIdx + 1}`,
            text: bp.text || { en: bp.en || '', ar: bp.ar || '' },
          }))
        : (defaultCard.bulletPoints || []);
      const { icon, ...restCard } = card;
      return {
        ...restCard,
        description: desc,
        shortDescription: shortDesc,
        bulletPoints,
      };
    });
  }
  return obj;
};

// GET /api/cms/services
export const getCmsServices = async (_req: Request, res: Response): Promise<void> => {
  try {
    let servicesDoc = await CmsServices.findOne();

    if (!servicesDoc) {
      servicesDoc = await CmsServices.create(defaultCmsServicesData);
    } else {
      let modified = false;

      if (!servicesDoc.headerSection || !servicesDoc.headerSection.title) {
        servicesDoc.headerSection = defaultCmsServicesData.headerSection;
        modified = true;
      }

      if (!servicesDoc.businessAreasSection || !servicesDoc.businessAreasSection.title) {
        servicesDoc.businessAreasSection = defaultCmsServicesData.businessAreasSection;
        modified = true;
      }

      if (modified) {
        await servicesDoc.save();
      }
    }

    res.status(200).json({
      success: true,
      data: sanitizeServicesDoc(servicesDoc),
    });
  } catch (error: any) {
    console.error('Error fetching CMS Services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Services data',
      error: error.message,
    });
  }
};

// PUT /api/cms/services or POST /api/cms/services
export const updateCmsServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    if (updateData.businessAreasSection && Array.isArray(updateData.businessAreasSection.cards)) {
      updateData.businessAreasSection.cards = updateData.businessAreasSection.cards.map((card: any) => {
        const { icon, ...restCard } = card;
        return {
          ...restCard,
          description: card.description || card.shortDescription || { en: '', ar: '' },
          shortDescription: card.shortDescription || card.description || { en: '', ar: '' },
          bulletPoints: Array.isArray(card.bulletPoints)
            ? card.bulletPoints.map((bp: any, bIdx: number) => ({
                id: bp.id || `bp-${bIdx + 1}`,
                text: bp.text || { en: bp.en || '', ar: bp.ar || '' },
              }))
            : [],
        };
      });
    }

    let servicesDoc = await CmsServices.findOne();

    if (!servicesDoc) {
      servicesDoc = new CmsServices({
        ...defaultCmsServicesData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        servicesDoc.headerSection = {
          ...servicesDoc.headerSection,
          ...updateData.headerSection,
        };
      }
      if (updateData.businessAreasSection) {
        servicesDoc.businessAreasSection = {
          ...servicesDoc.businessAreasSection,
          ...updateData.businessAreasSection,
        };
      }
    }

    await servicesDoc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Services updated successfully',
      data: sanitizeServicesDoc(servicesDoc),
    });
  } catch (error: any) {
    console.error('Error updating CMS Services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Services data',
      error: error.message,
    });
  }
};

