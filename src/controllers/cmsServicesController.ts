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
        icon: 'Microscope',
        title: {
          en: 'Medical & Laboratory Equipment',
          ar: 'المعدات الطبية والمخبرية',
        },
        description: {
          en: 'Comprehensive medical device solutions and laboratory testing equipment.',
          ar: 'حلول شاملة للأجهزة الطبية ومعدات الفحص المخبري.',
        },
        linkUrl: '/services/medical-equipment',
      },
      {
        id: 'card-area-2',
        icon: 'FlaskConical',
        title: {
          en: 'Laboratory Supplies',
          ar: 'المستلزمات المخبرية',
        },
        description: {
          en: 'Reliable laboratory supplies and essential equipment for research, testing, and diagnostic facilities.',
          ar: 'مستلزمات مخبرية موثوقة ومعدات أساسية لمرافق الأبحاث والاختبار والتشخيص.',
        },
        linkUrl: '/services/laboratory-supplies',
      },
      {
        id: 'card-area-3',
        icon: 'Stethoscope',
        title: {
          en: 'Healthcare Solutions',
          ar: 'حلول الرعاية الصحية',
        },
        description: {
          en: 'Quality healthcare products and solutions designed to support medical professionals and healthcare facilities.',
          ar: 'منتجات وحلول رعاية صحية عالية الجودة مصممة لدعم المتخصصين في المجال الطبي والمرافق الصحية.',
        },
        linkUrl: '/services/healthcare-solutions',
      },
      {
        id: 'card-area-4',
        icon: 'ShieldCheck',
        title: {
          en: 'Quality & Safety Standards',
          ar: 'معايير الجودة والسلامة',
        },
        description: {
          en: 'Products selected with a focus on quality, reliability, and compliance with applicable safety standards.',
          ar: 'منتجات مختارة مع التركيز على الجودة والموثوقية والامتثال لمعايير السلامة المعمول بها.',
        },
        linkUrl: '/services/standards',
      },
    ],
  },
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
      data: servicesDoc,
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
      data: servicesDoc,
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

