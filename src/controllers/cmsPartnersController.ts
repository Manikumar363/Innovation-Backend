import { Request, Response } from 'express';
import CmsPartners, { IPartnerCard, IPartnerCategoryGroup } from '../models/CmsPartners';

export { IPartnerCategoryGroup };

/**
 * Helper to group partner records by their category tags
 */
export const groupPartnersByCategory = (partners: IPartnerCard[] | any[]): IPartnerCategoryGroup[] => {
  if (!partners || !Array.isArray(partners)) return [];

  const groupsMap = new Map<string, IPartnerCategoryGroup>();

  for (const partner of partners) {
    const rawCategory = partner?.category;
    let enCat = '';
    let arCat = '';

    if (typeof rawCategory === 'string') {
      enCat = rawCategory.trim();
      arCat = rawCategory.trim();
    } else if (rawCategory && typeof rawCategory === 'object') {
      enCat = (rawCategory.en || '').trim();
      arCat = (rawCategory.ar || '').trim();
    }

    const tag = enCat || arCat || 'General';
    const groupKey = tag.toLowerCase();

    if (!groupsMap.has(groupKey)) {
      groupsMap.set(groupKey, {
        category: {
          en: enCat || arCat || 'General',
          ar: arCat || enCat || 'عام',
        },
        categoryTag: tag,
        count: 0,
        partners: [],
      });
    }

    const group = groupsMap.get(groupKey)!;
    group.count += 1;
    group.partners.push(partner);
  }

  return Array.from(groupsMap.values());
};

/**
 * Format the CMS Partners document into a response grouping partner records by category tags
 */
export const formatPartnersResponse = (partnersDoc: any, req?: Request) => {
  const docObj = typeof partnersDoc.toObject === 'function' ? partnersDoc.toObject() : { ...partnersDoc };
  const flatPartners: IPartnerCard[] = docObj.headerSection?.partners || [];
  const groupedPartners = groupPartnersByCategory(flatPartners);

  // Dictionary keyed by category tag
  const byCategory: Record<string, IPartnerCard[]> = {};
  for (const group of groupedPartners) {
    byCategory[group.categoryTag] = group.partners;
  }

  const isFlatRequested = req?.query?.flat === 'true' || req?.query?.grouped === 'false';

  return {
    ...docObj,
    headerSection: {
      ...docObj.headerSection,
      // Grouped by category tags instead of flat list
      partners: isFlatRequested ? flatPartners : groupedPartners,
      groupedPartners,
      byCategory,
      flatPartners,
      totalPartners: flatPartners.length,
      totalCategories: groupedPartners.length,
    },
  };
};

export const defaultCmsPartnersData = {
  headerSection: {
    title: {
      en: 'Our Partners',
      ar: 'شركاؤنا',
    },
    description: {
      en: 'Meet the trusted partners who share our vision, strengthen our capabilities, and help us drive innovation and create lasting impact together.',
      ar: 'تعرف على الشركاء الموثوقين الذين يشاركوننا رؤيتنا، ويعززون قدراتنا، ويساعدوننا في دفع عجلة الابتكار وإحداث تأثير دائم معاً.',
    },
    partners: [
      {
        id: 'partner-1',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Technology Partner',
          ar: 'شريك تكنولوجي',
        },
        name: {
          en: 'Microsoft',
          ar: 'مايكروسوفت',
        },
        description: {
          en: 'Empowering digital transformation through cloud computing, productivity tools, and innovative technology solutions.',
          ar: 'تمكين التحول الرقمي من خلال الحوسبة السحابية، وأدوات الإنتاجية، وحلول التكنولوجيا المبتكرة.',
        },
        websiteUrl: 'https://microsoft.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-2',
        logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Technology Partner',
          ar: 'شريك تكنولوجي',
        },
        name: {
          en: 'Google',
          ar: 'جوجل',
        },
        description: {
          en: 'Driving innovation through advanced digital technologies, cloud infrastructure, and intelligent solutions.',
          ar: 'قيادة الابتكار من خلال التقنيات الرقمية المتقدمة، والبنية التحتية السحابية، والحلول الذكية.',
        },
        websiteUrl: 'https://google.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-3',
        logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Cloud Partner',
          ar: 'شريك سحابي',
        },
        name: {
          en: 'Amazon Web Services',
          ar: 'أمازون لخدمات الويب',
        },
        description: {
          en: 'Supporting scalable and reliable digital experiences through cloud infrastructure and modern technology services.',
          ar: 'دعم التجارب الرقمية الموثوقة والقابلة للتطوير من خلال البنية التحتية السحابية والخدمات التكنولوجية الحديثة.',
        },
        websiteUrl: 'https://aws.amazon.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-4',
        logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Strategic Partner',
          ar: 'شريك استراتيجي',
        },
        name: {
          en: 'IBM',
          ar: 'آي بي إم',
        },
        description: {
          en: 'Combining expertise in AI, data, and enterprise technology to help organizations solve complex challenges.',
          ar: 'الجمع بين الخبرة في الذكاء الاصطناعي، والبيانات، وتكنولوجيا المؤسسات لمساعدة المنظمات في حل التحديات المعقدة.',
        },
        websiteUrl: 'https://ibm.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-5',
        logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Creative Partner',
          ar: 'شريك إبداعي',
        },
        name: {
          en: 'Adobe',
          ar: 'أدوبي',
        },
        description: {
          en: 'Enabling creative collaboration and engaging digital experiences through design and digital experience solutions.',
          ar: 'تمكين التعاون الإبداعي والتجارب الرقمية الجذابة من خلال حلول التصميم والخبرات الرقمية.',
        },
        websiteUrl: 'https://adobe.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-6',
        logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Innovation Partner',
          ar: 'شريك الابتكار',
        },
        name: {
          en: 'NVIDIA',
          ar: 'إنفيديا',
        },
        description: {
          en: 'Advancing innovation through accelerated computing, artificial intelligence, and high-performance computing platforms.',
          ar: 'دفع عجلة الابتكار من خلال الحوسبة المتسارعة، والذكاء الاصطناعي، ومنصات الحوسبة عالية الأداء.',
        },
        websiteUrl: 'https://nvidia.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
    ],
  },
  bannerSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'لنعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
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

// GET /api/cms/partners
export const getCmsPartners = async (req: Request, res: Response): Promise<void> => {
  try {
    let partnersDoc = await CmsPartners.findOne();

    if (!partnersDoc) {
      partnersDoc = new CmsPartners(defaultCmsPartnersData);
      await partnersDoc.save();
    } else {
      let modified = false;

      // Migrate header section
      if (!partnersDoc.headerSection) {
        partnersDoc.headerSection = defaultCmsPartnersData.headerSection;
        modified = true;
      } else {
        if (!partnersDoc.headerSection.title || (!partnersDoc.headerSection.title.en && !partnersDoc.headerSection.title.ar)) {
          partnersDoc.headerSection.title = defaultCmsPartnersData.headerSection.title;
          modified = true;
        }
        if (!partnersDoc.headerSection.description || (!partnersDoc.headerSection.description.en && !partnersDoc.headerSection.description.ar)) {
          partnersDoc.headerSection.description = defaultCmsPartnersData.headerSection.description;
          modified = true;
        }
        if (!partnersDoc.headerSection.partners || partnersDoc.headerSection.partners.length === 0) {
          partnersDoc.headerSection.partners = defaultCmsPartnersData.headerSection.partners;
          modified = true;
        }
      }

      // Migrate banner section
      if (!partnersDoc.bannerSection) {
        partnersDoc.bannerSection = defaultCmsPartnersData.bannerSection;
        modified = true;
      } else {
        if (!partnersDoc.bannerSection.title || (!partnersDoc.bannerSection.title.en && !partnersDoc.bannerSection.title.ar)) {
          partnersDoc.bannerSection.title = defaultCmsPartnersData.bannerSection.title;
          modified = true;
        }
        if (!partnersDoc.bannerSection.description || (!partnersDoc.bannerSection.description.en && !partnersDoc.bannerSection.description.ar)) {
          partnersDoc.bannerSection.description = defaultCmsPartnersData.bannerSection.description;
          modified = true;
        }
      }

      if (modified) {
        await partnersDoc.save();
      }
    }

    res.status(200).json({
      success: true,
      data: formatPartnersResponse(partnersDoc, req),
    });
  } catch (error: any) {
    console.error('Error fetching CMS Partners:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Partners data',
      error: error.message,
    });
  }
};

// PUT /api/cms/partners or POST /api/cms/partners
export const updateCmsPartners = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let partnersDoc = await CmsPartners.findOne();

    if (!partnersDoc) {
      partnersDoc = new CmsPartners({
        ...defaultCmsPartnersData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        let partnersToSave = updateData.headerSection.partners;

        // If client sent grouped partners, flatten them for DB storage
        if (Array.isArray(partnersToSave) && partnersToSave.length > 0) {
          if ('partners' in partnersToSave[0] && Array.isArray((partnersToSave[0] as any).partners)) {
            partnersToSave = partnersToSave.flatMap((group: any) => group.partners || []);
          }
        } else if (Array.isArray(updateData.headerSection.flatPartners)) {
          partnersToSave = updateData.headerSection.flatPartners;
        }

        partnersDoc.headerSection = {
          ...partnersDoc.headerSection,
          ...updateData.headerSection,
          partners: partnersToSave !== undefined ? partnersToSave : partnersDoc.headerSection.partners,
        };
      }
      if (updateData.bannerSection) {
        partnersDoc.bannerSection = {
          ...partnersDoc.bannerSection,
          ...updateData.bannerSection,
        };
      }
    }

    await partnersDoc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Partners updated successfully',
      data: formatPartnersResponse(partnersDoc, req),
    });
  } catch (error: any) {
    console.error('Error updating CMS Partners:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Partners data',
      error: error.message,
    });
  }
};

