import { Request, Response, NextFunction } from 'express';
import { CmsFounder } from '../models/CmsFounder';

export const defaultFounderData = {
  founderProfile: {
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    role: {
      en: 'FOUNDER & CEO',
      ar: 'المؤسس والرئيس التنفيذي',
    },
    name: {
      en: 'Dr. Ahmed Dhahir',
      ar: 'د. أحمد ظاهر',
    },
    subtitle: {
      en: 'A message from our founder',
      ar: 'رسالة من مؤسسنا',
    },
  },
  messageSection: {
    eyebrow: {
      en: 'A MESSAGE FROM OUR FOUNDER',
      ar: 'رسالة من مؤسسنا',
    },
    heading: {
      en: 'Building a Vision for Lasting Impact',
      ar: 'بناء رؤية ذات أثر مستدام',
    },
    greeting: {
      en: 'Welcome to Mubtaker Group.',
      ar: 'مرحباً بكم في مجموعة مبتكر.',
    },
    introParagraphs: [
      {
        en: 'Our journey is built on a clear vision: to create meaningful opportunities through innovation, trusted relationships, and responsible business practices.',
        ar: 'تأسست رحلتنا على رؤية واضحة: خلق فرص هادفة من خلال الابتكار، والعلاقات الموثوقة، والممارسات التجارية المسؤولة.',
      },
      {
        en: 'We believe sustainable success comes from understanding the needs of our partners, investing in promising opportunities, and delivering value that lasts.',
        ar: 'نؤمن بأن النجاح المستدام ينبع من فهم احتياجات شركائنا، والاستثمار في الفرص الواعدة، وتقديم قيمة تدوم طويلاً.',
      },
    ],
    companiesHeading: {
      en: 'OUR GROUP OF COMPANIES',
      ar: 'مجموعة شركاتنا',
    },
    companies: [
      {
        id: 'founder-comp-1',
        numberBadge: '01',
        name: {
          en: 'Projects Innovator',
          ar: 'مبتكر المشاريع',
        },
        description: {
          en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
          ar: 'تقديم حلول البناء والبنية التحتية المبتكرة التي تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
        },
        linkUrl: '/projects-innovator',
        order: 1,
        isActive: true,
      },
      {
        id: 'founder-comp-2',
        numberBadge: '02',
        name: {
          en: 'Attractive',
          ar: 'أتراكتيف',
        },
        description: {
          en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
          ar: 'مجموعة أعمال متنوعة تقود التميز في قطاعات الرعاية الصحية والبناء والتجارة والاستثمار.',
        },
        linkUrl: '/attractive',
        order: 2,
        isActive: true,
      },
      {
        id: 'founder-comp-3',
        numberBadge: '03',
        name: {
          en: 'Medics Innovator',
          ar: 'ميديكس إنوفيتور',
        },
        description: {
          en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
          ar: 'الارتقاء بالرعاية الصحية من خلال الحلول الطبية الموثوقة والمنتجات الصحية عالية الجودة والالتزام بتحسين نتائج المرضى.',
        },
        linkUrl: '/medics-innovator',
        order: 3,
        isActive: true,
      },
    ],
    closingParagraphs: [
      {
        en: 'Each company within our group contributes specialized expertise while sharing our commitment to quality, collaboration, and continuous improvement.',
        ar: 'تساهم كل شركة ضمن مجموعتنا بخبراتها المتخصصة مع التزام مشترك بالجودة والتعاون والتحسين المستمر.',
      },
      {
        en: 'As we continue to grow, our focus remains on building trusted partnerships, exploring new opportunities, and contributing positively to the communities we serve.',
        ar: 'مع استمرار نمونا، يظل تركيزنا منصباً على بناء شراكات موثوقة، واستكشاف فرص جديدة، والمساهمة بإيجابية في المجتمعات التي نخدمها.',
      },
    ],
    signOff: {
      en: 'Thank you for being part of our journey.',
      ar: 'شكراً لكونكم جزءاً من رحلتنا.',
    },
    signatureName: {
      en: 'Dr. Ahmed Dhahir',
      ar: 'د. أحمد ظاهر',
    },
  },
  showcaseSection: {
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    label: {
      en: 'LEADERSHIP',
      ar: 'القيادة',
    },
    title: {
      en: 'A Vision Built on Trust',
      ar: 'رؤية مبنية على الثقة',
    },
    commitmentCard: {
      label: {
        en: 'Our Commitment',
        ar: 'التزامنا',
      },
      title: {
        en: 'Long-Term Value',
        ar: 'قيمة طويلة الأمد',
      },
      description: {
        en: 'Building lasting partnerships through integrity, innovation, and shared success.',
        ar: 'بناء شراكات دائمة من خلال النزاهة والابتكار والنجاح المشترك.',
      },
      linkUrl: '/about',
    },
    bottomTagline: {
      en: 'Together, we build opportunities for a better future.',
      ar: 'معاً، نبني فرصاً لمستقبل أفضل.',
    },
  },
  isActive: true,
};

// GET Founder Section CMS Data
export const getCmsFounder = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let doc = await CmsFounder.findOne().lean();

    if (!doc) {
      doc = await CmsFounder.create(defaultFounderData);
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// PUT/POST Update Founder Section CMS Data
export const updateCmsFounder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    delete payload.createdAt;
    delete payload.updatedAt;

    const updated = await CmsFounder.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Founder section updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// POST Add company item to Founder's Group of Companies list
export const addFounderCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existingDoc = await CmsFounder.findOne();
    const count = existingDoc?.messageSection?.companies?.length || 0;
    const nextNum = String(count + 1).padStart(2, '0');

    const newItem = {
      id: req.body.id || `founder-comp-${Date.now()}`,
      numberBadge: req.body.numberBadge || nextNum,
      name: req.body.name || { en: 'New Group Company', ar: 'شركة جديدة بالمجموعة' },
      description: req.body.description || { en: '', ar: '' },
      linkUrl: req.body.linkUrl || '/',
      order: req.body.order || count + 1,
      isActive: req.body.isActive !== false,
    };

    const doc = await CmsFounder.findOneAndUpdate(
      {},
      { $push: { 'messageSection.companies': newItem } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Company added to Founder section successfully',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE Company item from Founder's Group of Companies list
export const deleteFounderCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const doc = await CmsFounder.findOneAndUpdate(
      {},
      { $pull: { 'messageSection.companies': { id } } },
      { new: true }
    );

    if (!doc) {
      res.status(404).json({
        success: false,
        message: 'Founder CMS document not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Company item removed from Founder section',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// POST Reset Founder Section to Default Template
export const resetFounderToDefaults = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await CmsFounder.deleteMany({});
    const fresh = await CmsFounder.create(defaultFounderData);

    res.status(200).json({
      success: true,
      message: 'Founder section reset to default content successfully',
      data: fresh,
    });
  } catch (error) {
    next(error);
  }
};

