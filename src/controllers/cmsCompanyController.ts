import { Request, Response } from 'express';
import CmsCompany from '../models/CmsCompany';

export const defaultCmsCompanyData = {
  headerSection: {
    title: {
      en: 'Company Profile',
      ar: 'ملف الشركة',
    },
    description: {
      en: 'Learn more about Mobtaker Group, our vision, and our commitment to innovation and sustainable growth.',
      ar: 'تعرف أكثر على مجموعة مبتكر، ورؤيتنا، والتزامنا بالابتكار والنمو المستدام.',
    },
  },

  whoWeAreSection: {
    tagline: {
      en: 'WHO WE ARE',
      ar: 'من نحن',
    },
    title: {
      en: 'Building Opportunities Through Innovation and Collaboration',
      ar: 'بناء الفرص من خلال الابتكار والتعاون',
    },
    description1: {
      en: 'Mobtaker Group is a diversified business organization focused on identifying opportunities, developing strategic relationships, and supporting initiatives that contribute to economic and business development.',
      ar: 'مجموعة مبتكر هي مؤسسة أعمال متنوعة تركز على تحديد الفرص، وبناء علاقات استراتيجية، ودعم المبادرات التي تسهم في التنمية الاقتصادية والتجارية.',
    },
    description2: {
      en: 'We aim to connect ideas, expertise, and resources to help businesses explore new possibilities. Through collaboration and a forward-looking approach, we strive to build lasting relationships with clients, partners, and stakeholders.',
      ar: 'نهدف إلى ربط الأفكار والخبرات والموارد لمساعدة الشركات في استكشاف إمكانيات جديدة. من خلال التعاون والنهج المستقبلي، نسعى جاهدين لبناء علاقات دائمة مع العملاء والشركاء والجهات المعنية.',
    },
    cards: [
      {
        id: 'card-overview',
        icon: 'Building2',
        title: {
          en: 'Our Overview',
          ar: 'نظرة عامة',
        },
        description: {
          en: 'We bring together business insight, collaboration, and practical solutions to explore opportunities across relevant sectors.',
          ar: 'نجمع بين الرؤية التجارية والتعاون والحلول العملية لاستكشاف الفرص عبر القطاعات ذات الصلة.',
        },
      },
      {
        id: 'card-vision',
        icon: 'Eye',
        title: {
          en: 'Our Vision',
          ar: 'رؤيتنا',
        },
        description: {
          en: 'To become a trusted business group recognized for innovation, responsible growth, and meaningful contributions to the markets we serve.',
          ar: 'أن نصبح مجموعة أعمال موثوقة ومعترف بها في الابتكار والنمو المسؤول والمساهمات ذات المغزى في الأسواق التي نخدمها.',
        },
      },
      {
        id: 'card-mission',
        icon: 'Target',
        title: {
          en: 'Our Mission',
          ar: 'رسالتنا',
        },
        description: {
          en: 'To develop valuable business opportunities, build strategic partnerships, and deliver practical solutions guided by integrity and long-term thinking.',
          ar: 'تطوير فرص أعمال قيمة، وبناء شراكات استراتيجية، وتقديم حلول عملية مسترشدين بالنزاهة والتفكير طويل الأمد.',
        },
      },
      {
        id: 'card-core-values',
        icon: 'ShieldCheck',
        title: {
          en: 'Our Core Values',
          ar: 'قيمنا الجوهرية',
        },
        description: {
          en: 'Our work is guided by collaboration, integrity, and a commitment to continuous improvement.',
          ar: 'يسترشد عملنا بالتعاون والنزاهة والالتزام بالتحسين المستمر.',
        },
      },
    ],
  },

  whatGuidesUsSection: {
    tagline: {
      en: 'WHAT GUIDES US',
      ar: 'ما يوجهنا',
    },
    title: {
      en: 'The Principles Behind Our Work',
      ar: 'المبادئ الكامنة وراء عملنا',
    },
    description: {
      en: 'We believe sustainable business relationships are built through trust, responsibility, and a shared commitment to progress.',
      ar: 'نؤمن بأن علاقات الأعمال المستدامة تُبنى من خلال الثقة والمسؤولية والالتزام المشترك بالتقدم.',
    },
    principles: [
      { id: 'p-1', en: 'Integrity', ar: 'النزاهة' },
      { id: 'p-2', en: 'Innovation', ar: 'الابتكار' },
      { id: 'p-3', en: 'Collaboration', ar: 'التعاون' },
      { id: 'p-4', en: 'Transparency', ar: 'الشفافية' },
      { id: 'p-5', en: 'Responsibility', ar: 'المسؤولية' },
      { id: 'p-6', en: 'Continuous Improvement', ar: 'التحسين المستمر' },
    ],
    downloadBox: {
      title: {
        en: 'Download Our Company Profile',
        ar: 'تحميل ملف الشركة التعريفي',
      },
      description: {
        en: 'Explore our company overview, vision, mission, and business approach in our company profile document.',
        ar: 'استكشف نظرة عامة على شركتنا ورؤيتها ورسالتها ونهجها التجاري في وثيقة ملف الشركة.',
      },
      buttonText: {
        en: 'Download Company Profile (PDF)',
        ar: 'تحميل ملف الشركة (PDF)',
      },
      pdfUrl: '',
      pdfName: 'Mobtaker-Group-Profile.pdf',
    },
  },
};

// GET /api/cms/company
export const getCmsCompany = async (_req: Request, res: Response): Promise<void> => {
  try {
    let companyDoc = await CmsCompany.findOne();

    if (!companyDoc) {
      companyDoc = await CmsCompany.create(defaultCmsCompanyData);
    } else {
      let modified = false;

      if (!companyDoc.headerSection || !companyDoc.headerSection.title) {
        companyDoc.headerSection = defaultCmsCompanyData.headerSection;
        modified = true;
      }

      if (!companyDoc.whoWeAreSection || !companyDoc.whoWeAreSection.title) {
        companyDoc.whoWeAreSection = defaultCmsCompanyData.whoWeAreSection;
        modified = true;
      }

      if (!companyDoc.whatGuidesUsSection || !companyDoc.whatGuidesUsSection.title) {
        companyDoc.whatGuidesUsSection = defaultCmsCompanyData.whatGuidesUsSection;
        modified = true;
      }

      if (modified) {
        await companyDoc.save();
      }
    }

    res.status(200).json({
      success: true,
      data: companyDoc,
    });
  } catch (error: any) {
    console.error('Error fetching CMS Company Profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Company Profile data',
      error: error.message,
    });
  }
};

// PUT /api/cms/company or POST /api/cms/company
export const updateCmsCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let companyDoc = await CmsCompany.findOne();

    if (!companyDoc) {
      companyDoc = new CmsCompany({
        ...defaultCmsCompanyData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        companyDoc.headerSection = {
          ...companyDoc.headerSection,
          ...updateData.headerSection,
        };
      }
      if (updateData.whoWeAreSection) {
        companyDoc.whoWeAreSection = {
          ...companyDoc.whoWeAreSection,
          ...updateData.whoWeAreSection,
        };
      }
      if (updateData.whatGuidesUsSection) {
        companyDoc.whatGuidesUsSection = {
          ...companyDoc.whatGuidesUsSection,
          ...updateData.whatGuidesUsSection,
        };
      }
    }

    await companyDoc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Company Profile updated successfully',
      data: companyDoc,
    });
  } catch (error: any) {
    console.error('Error updating CMS Company Profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Company Profile data',
      error: error.message,
    });
  }
};

