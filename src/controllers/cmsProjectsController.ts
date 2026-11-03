import { Request, Response } from 'express';
import CmsProjects from '../models/CmsProjects';

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
export const getCmsProjects = async (_req: Request, res: Response): Promise<void> => {
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

    res.status(200).json({
      success: true,
      data: projectsDoc,
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
      data: projectsDoc,
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

