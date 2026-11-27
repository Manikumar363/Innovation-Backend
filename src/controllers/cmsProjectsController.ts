import { Request, Response } from 'express';
import CmsProjects, { IProjectCard, IProjectCategoryTag } from '../models/CmsProjects';

export { IProjectCategoryTag };

/**
 * Helper to normalize string for comparison (removes extra spaces, hyphens, lowercase)
 */
export const normalizeText = (text: string): string => {
  return (text || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[-\s_]+/g, ' ');
};

/**
 * Extract unique category tags with bilingual labels and counts from a list of projects
 */
export const extractProjectCategories = (projects: IProjectCard[] | any[]): IProjectCategoryTag[] => {
  if (!projects || !Array.isArray(projects)) return [];

  const groupsMap = new Map<string, IProjectCategoryTag>();

  for (const project of projects) {
    const rawCategory = project?.category;
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
    const groupKey = normalizeText(tag);

    if (!groupsMap.has(groupKey)) {
      groupsMap.set(groupKey, {
        tag,
        category: {
          en: enCat || arCat || 'General',
          ar: arCat || enCat || 'عام',
        },
        count: 0,
      });
    }

    const item = groupsMap.get(groupKey)!;
    item.count += 1;
  }

  return Array.from(groupsMap.values());
};

/**
 * Helper to sanitize project cards (strips legacy status/statusType, ensures client and image)
 */
export const sanitizeProjectCard = (p: any): IProjectCard => {
  let clientVal = { en: '', ar: '' };
  if (typeof p?.client === 'string') {
    clientVal = { en: p.client, ar: p.client };
  } else if (p?.client && typeof p.client === 'object') {
    clientVal = {
      en: p.client.en || '',
      ar: p.client.ar || '',
    };
  }

  return {
    id: p?.id,
    category: p?.category || { en: '', ar: '' },
    title: p?.title || { en: '', ar: '' },
    description: p?.description || { en: '', ar: '' },
    client: clientVal,
    image: p?.image || '',
    linkUrl: p?.linkUrl || '',
  };
};

/**
 * Filter projects according to category tag
 */
export const filterProjectsList = (
  projects: IProjectCard[] | any[],
  categoryQuery?: string | string[]
): IProjectCard[] => {
  if (!projects || !Array.isArray(projects)) return [];

  // Parse categories into an array of search tokens
  let categoryTokens: string[] = [];
  if (Array.isArray(categoryQuery)) {
    categoryTokens = categoryQuery.flatMap((c) => (c ? c.split(',') : [])).map(normalizeText).filter(Boolean);
  } else if (typeof categoryQuery === 'string' && categoryQuery.trim() !== '') {
    categoryTokens = categoryQuery.split(',').map(normalizeText).filter(Boolean);
  }

  // Check if "all" or "*" is requested
  const isAllCategory = categoryTokens.length === 0 || categoryTokens.includes('all') || categoryTokens.includes('*');

  return projects.filter((project) => {
    if (isAllCategory) return true;

    const rawCategory = project?.category;
    let enCat = '';
    let arCat = '';

    if (typeof rawCategory === 'string') {
      enCat = rawCategory;
      arCat = rawCategory;
    } else if (rawCategory && typeof rawCategory === 'object') {
      enCat = rawCategory.en || '';
      arCat = rawCategory.ar || '';
    }

    const normEn = normalizeText(enCat);
    const normAr = normalizeText(arCat);

    return categoryTokens.some((token) => {
      return (
        normEn === token ||
        normAr === token ||
        normEn.includes(token) ||
        normAr.includes(token) ||
        token.includes(normEn) ||
        token.includes(normAr)
      );
    });
  });
};

/**
 * Format the CMS Projects response, populating available category tags and filtered projects
 */
export const formatProjectsResponse = (projectsDoc: any, req?: Request) => {
  const docObj = typeof projectsDoc.toObject === 'function' ? projectsDoc.toObject() : { ...projectsDoc };
  const rawProjects = docObj.headerSection?.projects || [];
  const allProjects: IProjectCard[] = rawProjects.map(sanitizeProjectCard);
  const availableCategories = extractProjectCategories(allProjects);
  const categoryTags = availableCategories.map((c) => c.tag);

  // Check if caller requested categories-only via query ?categories=true / ?categories=only / ?categories=list
  const isCategoriesOnly =
    req?.query?.categories === 'true' ||
    req?.query?.categories === 'only' ||
    req?.query?.categories === 'list' ||
    req?.query?.category === 'only' ||
    req?.query?.category === 'list';

  if (isCategoriesOnly) {
    return {
      categories: availableCategories,
      availableCategories,
      categoryTags,
      totalCategories: availableCategories.length,
      totalProjects: allProjects.length,
    };
  }

  // Extract filter parameters from query (?category=... or ?categories=...) or body
  const categoryParam =
    (req?.query?.category as string) ||
    (req?.query?.categories as string) ||
    (req?.query?.tag as string) ||
    (req?.query?.categoryTag as string) ||
    (req?.body?.category as string) ||
    (req?.body?.categories as string) ||
    (req?.body?.tag as string) ||
    (req?.body?.categoryTag as string);

  const isFiltered = Boolean(
    categoryParam &&
      typeof categoryParam === 'string' &&
      categoryParam.trim() !== '' &&
      categoryParam.toLowerCase() !== 'all' &&
      categoryParam !== '*'
  );

  const filteredProjects = isFiltered ? filterProjectsList(allProjects, categoryParam) : allProjects;

  return {
    ...docObj,
    headerSection: {
      ...docObj.headerSection,
      projects: filteredProjects,
      allProjects,
      categories: availableCategories,
      availableCategories,
      categoryTags,
      totalProjects: allProjects.length,
      filteredCount: filteredProjects.length,
      activeFilter: {
        category: isFiltered ? categoryParam : 'all',
        isFiltered,
      },
    },
    categories: availableCategories,
    categoryTags,
    totalProjects: allProjects.length,
    filteredCount: filteredProjects.length,
    activeCategory: isFiltered ? categoryParam : 'all',
  };
};

export const defaultCmsProjectsData = {
  headerSection: {
    title: {
      en: 'Our Projects',
      ar: 'مشاريعنا',
    },
    description: {
      en: 'Explore our projects, discover innovative ideas, and see how we turn our vision into impactful solutions that create lasting value.',
      ar: 'استكشف مشاريعنا، واكتشف الأفكار المبتكرة، وشاهد كيف نحول رؤيتنا إلى حلول مؤثرة تخلق قيمة دائمة.',
    },
    projects: [
      {
        id: 'proj-1',
        category: {
          en: 'Urban Innovation',
          ar: 'الابتكار الحضري',
        },
        client: {
          en: 'Baghdad Municipality',
          ar: 'أمانة بغداد',
        },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        title: {
          en: 'Smart City Development',
          ar: 'تطوير المدن الذكية',
        },
        description: {
          en: 'Developing intelligent urban solutions that improve infrastructure, optimize public services, and create sustainable communities.',
          ar: 'تطوير حلول حضرية ذكية تعمل على تحسين البنية التحتية، وتحسين الخدمات العامة، وبناء مجتمعات مستدامة.',
        },
        linkUrl: '/projects/smart-city',
      },
      {
        id: 'proj-2',
        category: {
          en: 'Technology',
          ar: 'التكنولوجيا والتحول الرقمي',
        },
        client: {
          en: 'Ministry of Communications',
          ar: 'وزارة الاتصالات',
        },
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        title: {
          en: 'Digital Transformation',
          ar: 'التحول الرقمي المؤسسي',
        },
        description: {
          en: 'Helping organizations modernize their operations through digital platforms, streamlined workflows, and innovative technologies.',
          ar: 'مساعدة المؤسسات على تحديث عملياتها من خلال المنصات الرقمية، وسير العمل المبسط، والتقنيات المبتكرة.',
        },
        linkUrl: '/projects/digital-transformation',
      },
      {
        id: 'proj-3',
        category: {
          en: 'Sustainability',
          ar: 'الاستدامة والبيئة',
        },
        client: {
          en: 'National Energy Authority',
          ar: 'الهيئة الوطنية للطاقة',
        },
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
        title: {
          en: 'Sustainable Energy Initiative',
          ar: 'مبادرة الطاقة المستدامة',
        },
        description: {
          en: 'Promoting sustainable energy solutions that support environmental responsibility and long-term resource efficiency.',
          ar: 'تعزيز حلول الطاقة المستدامة التي تدعم المسؤولية البيئية وكفاءة الموارد على المدى الطويل.',
        },
        linkUrl: '/projects/sustainable-energy',
      },
      {
        id: 'proj-4',
        category: {
          en: 'Social Impact',
          ar: 'الأثر الاجتماعي',
        },
        client: {
          en: 'Social Development Fund',
          ar: 'صندوق التنمية الاجتماعية',
        },
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        title: {
          en: 'Community Development',
          ar: 'تنمية المجتمع المحلي',
        },
        description: {
          en: 'Supporting community growth through inclusive initiatives, local engagement, and improved access to essential opportunities.',
          ar: 'دعم نمو المجتمع من خلال المبادرات الشاملة، والمشاركة المحلية، وتحسين الوصول إلى الفرص الأساسية.',
        },
        linkUrl: '/projects/community-development',
      },
      {
        id: 'proj-5',
        category: {
          en: 'Research & Development',
          ar: 'البحث والتطوير',
        },
        client: {
          en: 'Ministry of Higher Education',
          ar: 'وزارة التعليم العالي',
        },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        title: {
          en: 'Innovation Research Hub',
          ar: 'مركز أبحاث الابتكار',
        },
        description: {
          en: 'Encouraging research, collaboration, and the development of practical solutions to emerging industry challenges.',
          ar: 'تشجيع البحث والتعاون وتطوير حلول عملية لتحديات الصناعة الناشئة.',
        },
        linkUrl: '/projects/innovation-hub',
      },
      {
        id: 'proj-6',
        category: {
          en: 'Education',
          ar: 'التعليم والمعرفة',
        },
        client: {
          en: 'Education Development Board',
          ar: 'مجلس تطوير التعليم',
        },
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        title: {
          en: 'Digital Learning Platform',
          ar: 'منصة التعلم الرقمي',
        },
        description: {
          en: 'Expanding access to learning through digital experiences designed to support knowledge sharing and skill development.',
          ar: 'توسيع نطاق الوصول إلى التعلم من خلال التجارب الرقمية المصممة لدعم مشاركة المعرفة وتنمية المهارات.',
        },
        linkUrl: '/projects/digital-learning',
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

// GET /api/cms/projects
export const getCmsProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    let projectsDoc = await CmsProjects.findOne();

    if (!projectsDoc) {
      projectsDoc = new CmsProjects(defaultCmsProjectsData);
      await projectsDoc.save();
    } else {
      let modified = false;

      // Migrate header section
      if (!projectsDoc.headerSection) {
        projectsDoc.headerSection = defaultCmsProjectsData.headerSection;
        modified = true;
      } else {
        if (!projectsDoc.headerSection.title || (!projectsDoc.headerSection.title.en && !projectsDoc.headerSection.title.ar)) {
          projectsDoc.headerSection.title = defaultCmsProjectsData.headerSection.title;
          modified = true;
        }
        if (!projectsDoc.headerSection.description || (!projectsDoc.headerSection.description.en && !projectsDoc.headerSection.description.ar)) {
          projectsDoc.headerSection.description = defaultCmsProjectsData.headerSection.description;
          modified = true;
        }
        if (!projectsDoc.headerSection.projects || projectsDoc.headerSection.projects.length === 0) {
          projectsDoc.headerSection.projects = defaultCmsProjectsData.headerSection.projects;
          modified = true;
        }
      }

      // Migrate banner section
      if (!projectsDoc.bannerSection) {
        projectsDoc.bannerSection = defaultCmsProjectsData.bannerSection;
        modified = true;
      } else {
        if (!projectsDoc.bannerSection.title || (!projectsDoc.bannerSection.title.en && !projectsDoc.bannerSection.title.ar)) {
          projectsDoc.bannerSection.title = defaultCmsProjectsData.bannerSection.title;
          modified = true;
        }
        if (!projectsDoc.bannerSection.description || (!projectsDoc.bannerSection.description.en && !projectsDoc.bannerSection.description.ar)) {
          projectsDoc.bannerSection.description = defaultCmsProjectsData.bannerSection.description;
          modified = true;
        }
      }

      if (modified) {
        await projectsDoc.save();
      }
    }

    const formattedData = formatProjectsResponse(projectsDoc, req);

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error: any) {
    console.error('Error fetching CMS Projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Projects data',
      error: error.message,
    });
  }
};

// PUT /api/cms/projects or POST /api/cms/projects
export const updateCmsProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let projectsDoc = await CmsProjects.findOne();

    if (!projectsDoc) {
      const initialData = { ...defaultCmsProjectsData, ...updateData };
      if (initialData.headerSection && Array.isArray(initialData.headerSection.projects)) {
        initialData.headerSection.projects = initialData.headerSection.projects.map(sanitizeProjectCard);
      }
      projectsDoc = new CmsProjects(initialData);
    } else {
      if (updateData.headerSection) {
        const headerSec = { ...updateData.headerSection };
        if (Array.isArray(headerSec.projects)) {
          headerSec.projects = headerSec.projects.map(sanitizeProjectCard);
        }
        projectsDoc.headerSection = {
          ...projectsDoc.headerSection,
          ...headerSec,
        };
      }
      if (updateData.bannerSection) {
        projectsDoc.bannerSection = {
          ...projectsDoc.bannerSection,
          ...updateData.bannerSection,
        };
      }
    }

    await projectsDoc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Projects updated successfully',
      data: formatProjectsResponse(projectsDoc, req),
    });
  } catch (error: any) {
    console.error('Error updating CMS Projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Projects data',
      error: error.message,
    });
  }
};

