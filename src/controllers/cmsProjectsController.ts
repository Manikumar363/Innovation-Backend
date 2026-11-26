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
 * Filter projects according to category tag and optional status
 */
export const filterProjectsList = (
  projects: IProjectCard[] | any[],
  categoryQuery?: string | string[],
  statusQuery?: string
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

  const normalizedStatus = statusQuery ? normalizeText(statusQuery) : '';
  const isAllStatus = !normalizedStatus || normalizedStatus === 'all' || normalizedStatus === '*';

  return projects.filter((project) => {
    // 1. Category check
    let matchesCategory = isAllCategory;
    if (!isAllCategory) {
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

      matchesCategory = categoryTokens.some((token) => {
        return (
          normEn === token ||
          normAr === token ||
          normEn.includes(token) ||
          normAr.includes(token) ||
          token.includes(normEn) ||
          token.includes(normAr)
        );
      });
    }

    // 2. Status check (optional bonus filter)
    let matchesStatus = isAllStatus;
    if (!isAllStatus) {
      const statusType = normalizeText(project?.statusType || '');
      const statusEn = normalizeText(project?.status?.en || '');
      const statusAr = normalizeText(project?.status?.ar || '');

      matchesStatus =
        statusType === normalizedStatus ||
        statusEn === normalizedStatus ||
        statusAr === normalizedStatus ||
        statusEn.includes(normalizedStatus) ||
        statusAr.includes(normalizedStatus);
    }

    return matchesCategory && matchesStatus;
  });
};

/**
 * Format the CMS Projects response, populating available category tags and filtered projects
 */
export const formatProjectsResponse = (projectsDoc: any, req?: Request) => {
  const docObj = typeof projectsDoc.toObject === 'function' ? projectsDoc.toObject() : { ...projectsDoc };
  const allProjects: IProjectCard[] = docObj.headerSection?.projects || [];
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

  const statusParam =
    (req?.query?.status as string) ||
    (req?.query?.statusType as string) ||
    (req?.body?.status as string) ||
    (req?.body?.statusType as string);

  const isFiltered = Boolean(
    categoryParam &&
      typeof categoryParam === 'string' &&
      categoryParam.trim() !== '' &&
      categoryParam.toLowerCase() !== 'all' &&
      categoryParam !== '*'
  );

  const filteredProjects =
    isFiltered || statusParam ? filterProjectsList(allProjects, categoryParam, statusParam) : allProjects;

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
        status: statusParam || null,
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
        status: {
          en: 'Completed',
          ar: 'مكتمل',
        },
        statusType: 'completed' as const,
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
        status: {
          en: 'Ongoing',
          ar: 'قيد التنفيذ',
        },
        statusType: 'ongoing' as const,
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
        status: {
          en: 'Ongoing',
          ar: 'قيد التنفيذ',
        },
        statusType: 'ongoing' as const,
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
        status: {
          en: 'Completed',
          ar: 'مكتمل',
        },
        statusType: 'completed' as const,
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
        status: {
          en: 'Ongoing',
          ar: 'قيد التنفيذ',
        },
        statusType: 'ongoing' as const,
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
        status: {
          en: 'Planned',
          ar: 'مخطط له',
        },
        statusType: 'planned' as const,
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
      projectsDoc = new CmsProjects({
        ...defaultCmsProjectsData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        projectsDoc.headerSection = {
          ...projectsDoc.headerSection,
          ...updateData.headerSection,
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

