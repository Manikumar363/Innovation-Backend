import { Request, Response, NextFunction } from 'express';
import { CmsHome } from '../models/CmsHome';
import { CmsCtaBanner } from '../models/CmsCtaBanner';

export const defaultCmsHomeData = {
  hero: {
    mainTitle: {
      en: 'Driving Innovation for the Next Generation',
      ar: 'قيادة الابتكار للجيل القادم',
    },
    headingTag: {
      en: 'Empowering Visionaries & Sustainable Growth',
      ar: 'تمكين أصحاب الرؤى والنمو المستدام',
    },
    description: {
      en: 'We cultivate forward-thinking ecosystems, transformative investments, and cutting-edge digital solutions tailored to lead regional and global transformation.',
      ar: 'نعمل على تنمية أنظمة بيئية متطلعة للأمام، واستثمارات تحويلية، وحلول رقمية رائدة مصممة لقيادة التحول الإقليمي والعالمي.',
    },
    founder: {
      name: {
        en: 'Dr. Tariq Al-Mansoor',
        ar: 'د. طارق المنصور',
      },
      description: {
        en: 'Founder & Executive Chairman with over 20 years of leadership in venture acceleration, sovereign investment, and technological enterprise development.',
        ar: 'مؤسس ورئيس تنفيذي يتمتع بخبرة تزيد عن 20 عامًا في قيادة تسريع المشاريع، والاستثمار السيادي، وتطوير المشاريع التكنولوجية.',
      },
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
  },
  trustedBrands: [
    {
      name: 'Aramco Ventures',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://example.com',
    },
    {
      name: 'NEOM Tech',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://example.com',
    },
    {
      name: 'SABIC Horizon',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://example.com',
    },
    {
      name: 'Global Innovation Hub',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://example.com',
    },
  ],
  aboutSectorsSection: {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: {
      en: 'A Diversified Group Built on Excellence',
      ar: 'مجموعة متنوعة مبنية على التميز',
    },
    description: {
      en: 'Mobtaker Group is a multi-sector group based in Baghdad, Iraq, with a presence in Dubai, UAE. Registered with the Iraqi Ministry of Commerce under the Excellent classification, the group operates through three specialized entities across healthcare, construction, trading, and investment.',
      ar: 'مجموعة مبتكر هي مجموعة متعددة القطاعات مقرها بغداد، العراق، ولها حضور في دبي، الإمارات العربية المتحدة. مسجلة لدى وزارة التجارة العراقية تحت تصنيف ممتاز، وتعمل المجموعة من خلال ثلاثة كيانات متخصصة عبر الرعاية الصحية، البناء، التجارة، والاستثمار.',
    },
    location: {
      en: 'Arasat Street, Karrada, Baghdad, Iraq',
      ar: 'شارع العرصات، الكرادة، بغداد، العراق',
    },
    sectors: [
      {
        id: 'sector-1',
        title: {
          en: 'Healthcare',
          ar: 'الرعاية الصحية',
        },
      },
      {
        id: 'sector-2',
        title: {
          en: 'Construction',
          ar: 'البناء والتشييد',
        },
      },
      {
        id: 'sector-3',
        title: {
          en: 'Trading',
          ar: 'التجارة',
        },
      },
      {
        id: 'sector-4',
        title: {
          en: 'Investment',
          ar: 'الاستثمار',
        },
      },
    ],
  },
  // Section 4: Specialized Companies
  companiesSection: {
    tagline: {
      en: 'OUR COMPANIES',
      ar: 'شركاتنا المتخصصة',
    },
    title: {
      en: 'Three Specialized Divisions. One Group',
      ar: 'ثلاثة أقسام متخصصة. مجموعة واحدة',
    },
    description: {
      en: 'Discover the specialized companies driving innovation and excellence across our group.',
      ar: 'اكتشف الشركات المتخصصة التي تقود الابتكار والتميز عبر مجموعتنا.',
    },
    companies: [
      {
        id: 'comp-1',
        name: {
          en: 'Projects Innovator',
          ar: 'مبتكر المشاريع',
        },
        description: {
          en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
          ar: 'تقديم حلول بناء وبنية تحتية مبتكرة تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
        },
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
        websiteUrl: '/projects-innovator',
        color: 'red',
      },
      {
        id: 'comp-2',
        name: {
          en: 'Attractive',
          ar: 'أتراكتيف',
        },
        description: {
          en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
          ar: 'مجموعة أعمال متنوعة تدفع التميز عبر الرعاية الصحية والبناء والتجارة والاستثمار.',
        },
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
        websiteUrl: '/attractive',
        color: 'blue',
      },
      {
        id: 'comp-3',
        name: {
          en: 'Medios Innovator',
          ar: 'مبتكر ميديوس',
        },
        description: {
          en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
          ar: 'الارتقاء بالرعاية الصحية من خلال حلول طبية موثوقة، ومنتجات رعاية صحية عالية الجودة، والتزام بنتائج أفضل للمرضى.',
        },
        logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80',
        websiteUrl: '/medios-innovator',
        color: 'blue',
      },
    ],
  },
  // Section 5: Purpose, Vision & Mission
  purposeSection: {
    tagline: {
      en: 'OUR PURPOSE',
      ar: 'هدفنا ورؤيتنا',
    },
    title: {
      en: 'Driven by Vision. Defined by Purpose.',
      ar: 'مدفوعون بالرؤية. محددون بالهدف.',
    },
    description: {
      en: 'We bring businesses and people together through strategic investment, responsible development, and long-term partnerships.',
      ar: 'نجمع بين الشركات والأفراد من خلال الاستثمار الاستراتيجي والتنمية المسؤولة والشراكات طويلة الأجل.',
    },
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: [
      {
        id: 'tag-1',
        title: {
          en: 'Our Vision',
          ar: 'رؤيتنا',
        },
        description: {
          en: 'To create meaningful opportunities for businesses and individuals through innovation, growth, and trusted partnerships.',
          ar: 'خلق فرص ذات مغزى للشركات والأفراد من خلال الابتكار والنمو والشراكات الموثوقة.',
        },
      },
      {
        id: 'tag-2',
        title: {
          en: 'Our Mission',
          ar: 'رسالتنا',
        },
        description: {
          en: 'To promote sustainable development by using resources responsibly and delivering lasting value to our partners and communities.',
          ar: 'تعزيز التنمية المستدامة من خلال استخدام الموارد بمسؤولية وتقديم قيمة دائمة لشركائنا ومجتمعاتنا.',
        },
      },
    ],
  },
  // Section 6: Banner
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
      ar: 'هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية، أو خدمات أعمال؟ فريقنا مستعد لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض سعر',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const getCmsHome = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let cmsData = await CmsHome.findOne().lean();

    if (!cmsData) {
      cmsData = await CmsHome.create(defaultCmsHomeData);
    }

    // Overlay with centralized CTA Banner if exists
    const ctaBanner = await CmsCtaBanner.findOne().lean();
    if (ctaBanner) {
      (cmsData as any).bannerSection = {
        tagline: ctaBanner.tagline,
        title: ctaBanner.title,
        description: ctaBanner.description,
        primaryButtonText: ctaBanner.primaryButtonText,
        primaryButtonUrl: ctaBanner.primaryButtonUrl,
        secondaryButtonText: ctaBanner.secondaryButtonText,
        secondaryButtonUrl: ctaBanner.secondaryButtonUrl,
      };
    }

    res.status(200).json({
      success: true,
      data: cmsData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCmsHome = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;

    const updated = await CmsHome.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    // If bannerSection was updated, synchronize it to centralized CmsCtaBanner
    if (payload.bannerSection) {
      await CmsCtaBanner.findOneAndUpdate(
        {},
        { $set: payload.bannerSection },
        { upsert: true, runValidators: true }
      ).catch(() => {});
    }

    res.status(200).json({
      success: true,
      message: 'CMS Home Page content updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
