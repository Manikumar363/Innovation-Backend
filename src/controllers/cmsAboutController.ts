import { Request, Response, NextFunction } from 'express';
import { CmsAbout } from '../models/CmsAbout';

export const defaultCmsAboutData = {
  headerSection: {
    title: {
      en: 'About Us',
      ar: 'من نحن',
    },
    description: {
      en: 'Discover our heritage, explore our journey of evolution, and learn about the vision, values, and leadership that drive our commitment to innovation and excellence.',
      ar: 'اكتشف تراثنا، واستكشف مسيرة تطورنا، وتعرف على الرؤية والقيم والقيادة التي تقود التزامنا بالابتكار والتميز.',
    },
  },
  heritageSection: {
    tagline: {
      en: 'OUR HERITAGE',
      ar: 'تراثنا وعراقتنا',
    },
    title: {
      en: 'Built on Trust. Driven by Ambition.',
      ar: 'مبني على الثقة. مدفوع بالطموح.',
    },
    description: {
      en: 'Mobtaker Group brings together specialized businesses under a shared commitment to excellence, trusted partnerships, and sustainable growth.',
      ar: 'تجمع مجموعة مبتكر بين الشركات المتخصصة تحت التزام مشترك بالتميز والشراكات الموثوقة والنمو المستدام.',
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    badgeYear: '2017',
    badgeText: {
      en: 'Established',
      ar: 'سنة التأسيس',
    },
  },
  journeySection: {
    tagline: {
      en: 'OUR JOURNEY',
      ar: 'مسيرتنا',
    },
    title: {
      en: 'Evolving Through Opportunity',
      ar: 'التطور من خلال الفرص',
    },
    description: {
      en: 'Our journey reflects a commitment to adapting, expanding, and creating lasting value across industries.',
      ar: 'تعكس مسيرتنا التزاماً بالتكيف والتوسع وخلق قيمة دائمة عبر مختلف القطاعات.',
    },
    items: [
      {
        id: 'journey-1',
        number: '01',
        title: {
          en: 'Building a Strong Foundation',
          ar: 'بناء أساس قوي',
        },
        description: {
          en: 'Establishing trusted relationships and developing a foundation for sustainable business growth.',
          ar: 'بناء علاقات موثوقة وتطوير أساس لنمو الأعمال المستدام.',
        },
      },
      {
        id: 'journey-2',
        number: '02',
        title: {
          en: 'Expanding Our Horizons',
          ar: 'توسيع آفاقنا',
        },
        description: {
          en: 'Growing across specialized sectors and exploring opportunities through strategic partnerships.',
          ar: 'النمو عبر القطاعات المتخصصة واستكشاف الفرص من خلال الشراكات الاستراتيجية.',
        },
      },
    ],
  },
  impactSection: {
    tagline: {
      en: 'OUR ACHIEVEMENTS',
      ar: 'إنجازاتنا',
    },
    title: {
      en: 'Our Impact in Numbers',
      ar: 'أثرنا بالأرقام',
    },
    stats: [
      {
        id: 'stat-1',
        number: '20+',
        description: {
          en: 'Years of Excellence',
          ar: 'سنوات من التميز',
        },
      },
      {
        id: 'stat-2',
        number: '500+',
        description: {
          en: 'Satisfied Customers',
          ar: 'عميل راضٍ',
        },
      },
      {
        id: 'stat-3',
        number: '140+',
        description: {
          en: 'Projects Delivered',
          ar: 'مشروع منجز',
        },
      },
    ],
  },
  // Section 5: Our Leadership
  leadershipSection: {
    tagline: {
      en: 'OUR LEADERSHIP',
      ar: 'قيادتنا',
    },
    title: {
      en: 'The People Behind Our Progress',
      ar: 'الأشخاص وراء تقدمنا',
    },
    description: {
      en: 'Meet the leadership and teams working together to deliver quality, innovation, and lasting value across our group.',
      ar: 'تعرف على القيادة وفرق العمل التي تعمل معاً لتقديم الجودة والابتكار وقيمة دائمة عبر مجموعتنا.',
    },
    leaders: [
      {
        id: 'leader-1',
        name: {
          en: 'Dr. Ahmed Dhahir',
          ar: 'د. أحمد ظاهر',
        },
        role: {
          en: 'Founder & CEO',
          ar: 'المؤسس والرئيس التنفيذي',
        },
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  // Section 6: Our Management Team
  managementSection: {
    tagline: {
      en: 'OUR LEADERSHIP & MANAGEMENT',
      ar: 'فريق الإدارة والقيادة',
    },
    title: {
      en: 'Our Management Team',
      ar: 'فريق الإدارة لدينا',
    },
    description: {
      en: 'Specialized executive leadership across our three group divisions.',
      ar: 'قيادة تنفيذية متخصصة عبر أقسام مجموعتنا الثلاثة.',
    },
    divisions: [
      {
        id: 'div-1',
        badge: 'PI',
        companyName: {
          en: 'Projects Innovator',
          ar: 'مبتكر المشاريع',
        },
        description: {
          en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
          ar: 'تقديم حلول بناء وبنية تحتية مبتكرة تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
        },
        linkText: {
          en: 'Projects Innovator ↗',
          ar: 'مبتكر المشاريع ↗',
        },
        linkUrl: '/projects-innovator',
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
        members: [
          {
            id: 'member-1-1',
            name: { en: 'Management Member 1', ar: 'عضو الإدارة 1' },
            role: { en: 'General Manager', ar: 'المدير العام' },
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            id: 'member-1-2',
            name: { en: 'Management Member 2', ar: 'عضو الإدارة 2' },
            role: { en: 'Operations Manager', ar: 'مدير العمليات' },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
      {
        id: 'div-2',
        badge: 'AT',
        companyName: {
          en: 'Attractive',
          ar: 'أتراكتيف',
        },
        description: {
          en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
          ar: 'مجموعة أعمال متنوعة تقود التميز عبر الرعاية الصحية، البناء، التجارة، والاستثمار.',
        },
        linkText: {
          en: 'Attractive ↗',
          ar: 'أتراكتيف ↗',
        },
        linkUrl: '/attractive',
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
        members: [
          {
            id: 'member-2-1',
            name: { en: 'Management Member 1', ar: 'عضو الإدارة 1' },
            role: { en: 'General Manager', ar: 'المدير العام' },
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            id: 'member-2-2',
            name: { en: 'Management Member 2', ar: 'عضو الإدارة 2' },
            role: { en: 'Operations Manager', ar: 'مدير العمليات' },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
      {
        id: 'div-3',
        badge: 'MI',
        companyName: {
          en: 'Medics Innovator',
          ar: 'ميديكس إنوفيتور',
        },
        description: {
          en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
          ar: 'الارتقاء بالرعاية الصحية من خلال حلول طبية موثوقة ومنتجات رعاية صحية عالية الجودة والتزام بنتائج أفضل للمرضى.',
        },
        linkText: {
          en: 'Medics Innovator ↗',
          ar: 'ميديكس إنوفيتور ↗',
        },
        linkUrl: '/medics-innovator',
        logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80',
        members: [
          {
            id: 'member-3-1',
            name: { en: 'Management Member 1', ar: 'عضو الإدارة 1' },
            role: { en: 'General Manager', ar: 'المدير العام' },
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            id: 'member-3-2',
            name: { en: 'Management Member 2', ar: 'عضو الإدارة 2' },
            role: { en: 'Operations Manager', ar: 'مدير العمليات' },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
    ],
  },
  // Section 7: Our Core Values
  coreValuesSection: {
    tagline: {
      en: 'WHAT WE STAND FOR',
      ar: 'ما نمثله ونلتزم به',
    },
    title: {
      en: 'Our Core Values',
      ar: 'قيمنا الجوهرية',
    },
    description: {
      en: 'The principles that guide our decisions, shape our actions, and define the relationships we build with our clients, partners, and communities.',
      ar: 'المبادئ التي توجه قراراتنا، وتشكل أفعالنا، وتحدد العلاقات التي نبنيها مع عملائنا وشركائنا ومجتمعاتنا.',
    },
    values: [
      {
        id: 'val-1',
        number: '01',
        icon: 'Handshake',
        title: { en: 'Relationships', ar: 'العلاقات والشراكات' },
        description: {
          en: 'We build lasting relationships through trust, transparency, and a genuine commitment to understanding and supporting our clients.',
          ar: 'نبني علاقات دائمة من خلال الثقة والشفافية والالتزام الحقيقي بفهم ودعم عملائنا.',
        },
      },
      {
        id: 'val-2',
        number: '02',
        icon: 'Headphones',
        title: { en: 'Service', ar: 'الخدمة المتميزة' },
        description: {
          en: 'We strive to deliver responsive, reliable, and high-quality service that addresses our clients\' needs and exceeds expectations.',
          ar: 'نسعى جاهدين لتقديم خدمة سريعة وموثوقة وعالية الجودة تلبي احتياجات عملائنا وتتجاوز التوقعات.',
        },
      },
      {
        id: 'val-3',
        number: '03',
        icon: 'Users',
        title: { en: 'Partnership & Counsel', ar: 'الشراكة والمشورة' },
        description: {
          en: 'We work alongside our partners, offering thoughtful guidance, shared expertise, and collaborative solutions that create lasting value.',
          ar: 'نعمل جنباً إلى جنب مع شركائنا، ونقدم توجيهاً مدروساً، وخبرات مشتركة، وحلولاً تعاونية تخلق قيمة دائمة.',
        },
      },
      {
        id: 'val-4',
        number: '04',
        icon: 'Scale',
        title: { en: 'Diversity', ar: 'التنوع والشمولية' },
        description: {
          en: 'We value diverse perspectives, experiences, and ideas, recognizing that inclusion strengthens our teams and drives better outcomes.',
          ar: 'نقدر وجهات النظر والخبرات والأفكار المتنوعة، مدركين أن الشمولية تقوي فرقنا وتحقق نتائج أفضل.',
        },
      },
      {
        id: 'val-5',
        number: '05',
        icon: 'Lightbulb',
        title: { en: 'Opportunity', ar: 'الفرص والابتكار' },
        description: {
          en: 'We identify opportunities for progress and growth, helping businesses and people turn promising ideas into meaningful results.',
          ar: 'نحدد فرص التقدم والنمو، ونساعد الشركات والأفراد على تحويل الأفكار الواعدة إلى نتائج ذات مغزى.',
        },
      },
      {
        id: 'val-6',
        number: '06',
        icon: 'ShieldCheck',
        title: { en: 'Authenticity', ar: 'المصداقية والأصالة' },
        description: {
          en: 'We act with integrity, remain true to our commitments, and build trust through honest communication and responsible decisions.',
          ar: 'نتصرف بنزاهة، ونبقى أوفياء لالتزاماتنا، ونبني الثقة من خلال التواصل الصادق والقرارات المسؤولة.',
        },
      },
    ],
  },
  // Section 8: Our History & Ownership
  historySection: {
    tagline: {
      en: 'OUR BACKGROUND',
      ar: 'خلفيتنا وتاريخنا',
    },
    title: {
      en: 'Our History & Ownership',
      ar: 'تاريخنا وهيكلية الملكية',
    },
    description: {
      en: 'Discover the foundations of our business, the expertise behind our journey, and the framework that supports our continued growth.',
      ar: 'اكتشف أسس أعمالنا، والخبرة الكامنة وراء مسيرتنا، والإطار الذي يدعم نمونا المستمر.',
    },
    items: [
      {
        id: 'hist-1',
        number: '01',
        icon: 'History',
        title: { en: 'Brief History', ar: 'نبذة تاريخية' },
        description: {
          en: 'Salama was established in 2020, with its headquarters in Baghdad, Iraq. The company specializes in administrative services and investment consultancy across insurance, healthcare, healthcare management, industry, construction, infrastructure, investment, and agriculture. Salama serves as a bridge between businesses and stakeholders, helping facilitate collaboration and achieve efficient, sustainable, and successful outcomes. In its early years, the company established partnerships with several major local and international businesses.',
          ar: 'تأسست سلامة في عام 2020، ومقرها الرئيسي في بغداد، العراق. وتتخصص الشركة في الخدمات الإدارية والاستشارات الاستثمارية عبر التأمين والرعاية الصحية وإدارة الرعاية الصحية والصناعة والبناء والبنية التحتية والاستثمار والزراعة. وتعمل سلامة كجسر بين الشركات وأصحاب المصلحة، مما يساعد على تسهيل التعاون وتحقيق نتائج فعالة ومستدامة وناجحة.',
        },
      },
      {
        id: 'hist-2',
        number: '02',
        icon: 'Building2',
        title: { en: 'Shareholding Structure', ar: 'هيكلية المساهمة والملكية' },
        description: {
          en: 'Salama\'s shareholding structure outlines the ownership framework behind the company and the interests represented in its business. For an accurate overview of shareholders, ownership percentages, and governance arrangements, refer to the company\'s official corporate documentation.',
          ar: 'تحدد هيكلية المساهمة في سلامة إطار الملكية وراء الشركة والمصالح الممثلة في أعمالها. للحصول على نظرة دقيقة على المساهمين ونسب الملكية وترتيبات الحوكمة، يرجى الرجوع إلى الوثائق الرسمية للشركة.',
        },
      },
    ],
  },
  // Section 9: Our Purpose
  purposeSection: {
    tagline: {
      en: 'OUR PURPOSE',
      ar: 'هدفنا وغايتنا',
    },
    title: {
      en: 'Driving Progress Through Clear Objectives',
      ar: 'دفع عجلة التقدم من خلال أهداف واضحة',
    },
    description: {
      en: 'We partner with like-minded organizations to promote sustainability and develop practical solutions. By collaborating with communities, government bodies, and businesses, we bring together expertise, resources, and influence to create positive change, strengthen stakeholder relationships, and uphold ethical business practices.',
      ar: 'نحن نتشارك مع المنظمات ذات التفكير المماثل لتعزيز الاستدامة وتطوير حلول عملية. من خلال التعاون مع المجتمعات والهيئات الحكومية والشركات، نجمع بين الخبرة والموارد والتأثير لإحداث تغيير إيجابي وتعزيز علاقات أصحاب المصلحة ودعم ممارسات الأعمال الأخلاقية.',
    },
    highlightTitle: {
      en: 'Committed to Shared Progress',
      ar: 'ملتزمون بالتقدم المشترك',
    },
    highlightDescription: {
      en: 'We believe meaningful results come from responsible management, community engagement, and trusted client partnerships.',
      ar: 'نحن نؤمن بأن النتائج ذات المغزى تأتي من الإدارة المسؤولة، والمشاركة المجتمعية، والشراكات الموثوقة مع العملاء.',
    },
    highlightIcon: 'Heart',
    objectivesTagline: {
      en: 'OUR PRIORITIES',
      ar: 'أولوياتنا',
    },
    objectivesTitle: {
      en: 'Our Objectives',
      ar: 'أهدافنا',
    },
    objectives: [
      {
        id: 'obj-1',
        number: '01',
        icon: 'Target',
        title: { en: 'Effective Project Management', ar: 'إدارة المشاريع الفعالة' },
      },
      {
        id: 'obj-2',
        number: '02',
        icon: 'HandHeart',
        title: { en: 'Contributing to Community Service', ar: 'المساهمة في خدمة المجتمع' },
      },
      {
        id: 'obj-3',
        number: '03',
        icon: 'ShieldCheck',
        title: { en: 'Becoming a Trusted Partner for Our Clients', ar: 'أن نصبح شريكاً موثوقاً لعملائنا' },
      },
    ],
  },
  // Section 10: Call to Action Banner
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
      ar: 'هل تبحث عن منتجات طبية أو معدات أو حلول صيدلانية أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
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

export const getCmsAbout = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await CmsAbout.findOne().lean();

    if (!data) {
      data = await CmsAbout.create(defaultCmsAboutData);
    } else {
      // Smoothly populate missing sections if an older version of document exists in DB
      let modified = false;
      const merged: any = { ...defaultCmsAboutData, ...data };

      if (!data.leadershipSection || !data.leadershipSection.leaders || data.leadershipSection.leaders.length === 0) {
        merged.leadershipSection = defaultCmsAboutData.leadershipSection;
        modified = true;
      }
      if (!data.managementSection || !data.managementSection.divisions || data.managementSection.divisions.length === 0) {
        merged.managementSection = defaultCmsAboutData.managementSection;
        modified = true;
      }
      if (!data.coreValuesSection || !data.coreValuesSection.values || data.coreValuesSection.values.length === 0) {
        merged.coreValuesSection = defaultCmsAboutData.coreValuesSection;
        modified = true;
      }
      if (!data.historySection || !data.historySection.items || data.historySection.items.length === 0) {
        merged.historySection = defaultCmsAboutData.historySection;
        modified = true;
      }
      if (!data.purposeSection || !data.purposeSection.objectives || data.purposeSection.objectives.length === 0) {
        merged.purposeSection = defaultCmsAboutData.purposeSection;
        modified = true;
      }
      if (!data.bannerSection || !data.bannerSection.title?.en) {
        merged.bannerSection = defaultCmsAboutData.bannerSection;
        modified = true;
      }

      if (modified) {
        await CmsAbout.updateOne({}, { $set: merged });
        data = merged;
      }
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCmsAbout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;

    const updated = await CmsAbout.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'CMS About Us content updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
