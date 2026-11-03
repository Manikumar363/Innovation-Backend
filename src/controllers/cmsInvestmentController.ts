import { Request, Response } from 'express';
import CmsInvestment from '../models/CmsInvestment';

export const defaultCmsInvestmentData = {
  headerSection: {
    title: {
      en: 'Investment Opportunities',
      ar: 'فرص الاستثمار',
    },
    description: {
      en: 'Explore investment opportunities with Mobtaker Group and discover how we create value through innovation, strategic partnerships, and sustainable growth.',
      ar: 'استكشف فرص الاستثمار مع مجموعة مبتكر واكتشف كيف نخلق القيمة من خلال الابتكار والشراكات الاستراتيجية والنمو المستدام.',
    },
  },
  missionSection: {
    tagline: {
      en: 'INSTITUTIONAL MISSION',
      ar: 'المهمة المؤسسية',
    },
    title: {
      en: 'Best Investment Solutions for Sustainable National Growth',
      ar: 'أفضل الحلول الاستثمارية لتحقيق نمو وطني مستدام',
    },
    description: {
      en: "Mobtaker Group focuses on strategic investment opportunities across commercial real estate, high-throughput industrial facilities, and technology-driven agricultural projects in Iraq's key economic hubs.\n\nWe connect foreign institutional investors with viable, investment-ready domestic opportunities. These carefully selected initiatives help rebuild national infrastructure while creating long-term value for corporate ventures, family offices, and local enterprises.\n\nThrough strategic partners, including Salama Financial Group and leading banking institutions, we aim to facilitate financing solutions, liquidity support, and investment structures designed to manage risk and support sustainable returns.",
      ar: 'تركز مجموعة مبتكر على فرص الاستثمار الاستراتيجي عبر العقارات التجارية، والمرافق الصناعية عالية الإنتاجية، والمشاريع الزراعية القائمة على التكنولوجيا في المراكز الاقتصادية الرئيسية في العراق.\n\nنحن نربط المستثمرين المؤسسيين الأجانب بفرص محلية مجدية وجاهزة للاستثمار. تساعد هذه المبادرات المختارة بعناية في إعادة بناء البنية التحتية الوطنية مع خلق قيمة طويلة الأجل للمشاريع المؤسسية والمكاتب العائلية والشركات المحلية.\n\nمن خلال شركاء استراتيجيين، بما في ذلك مجموعة سلامة المالية والمؤسسات المصرفية الرائدة، نهدف إلى تسهيل حلول التمويل، ودعم السيولة، وهياكل الاستثمار المصممة لإدارة المخاطر ودعم العوائد المستدامة.',
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  driversSection: {
    tagline: {
      en: 'MACROECONOMIC DRIVERS',
      ar: 'المحركات الاقتصادية الكلية',
    },
    title: {
      en: 'Why Invest in Iraq Now?',
      ar: 'لماذا الاستثمار في العراق الآن؟',
    },
    description: {
      en: "Discover the key sectors and economic opportunities shaping Iraq's investment landscape.",
      ar: 'اكتشف القطاعات الرئيسية والفرص الاقتصادية التي تشكل المشهد الاستثماري في العراق.',
    },
    drivers: [
      {
        id: 'driver-1',
        number: '01',
        title: {
          en: 'Economic Growth',
          ar: 'النمو الاقتصادي',
        },
        description: {
          en: 'Growing demand across key industries creates opportunities for businesses and long-term investors.',
          ar: 'الطلب المتزايد عبر الصناعات الرئيسية يخلق فرصاً للشركات والمستثمرين على المدى الطويل.',
        },
      },
      {
        id: 'driver-2',
        number: '02',
        title: {
          en: 'Infrastructure Development',
          ar: 'تطوير البنية التحتية',
        },
        description: {
          en: 'Reconstruction and modernization initiatives create demand for infrastructure, construction, and essential services.',
          ar: 'مبادرات إعادة الإعمار والتحديث تخلق طلباً على البنية التحتية والبناء والخدمات الأساسية.',
        },
      },
      {
        id: 'driver-3',
        number: '03',
        title: {
          en: 'Natural Resources',
          ar: 'الموارد الطبيعية',
        },
        description: {
          en: "Iraq's significant natural resource base supports opportunities across energy and related industries.",
          ar: 'قاعدة الموارد الطبيعية الكبيرة في العراق تدعم الفرص عبر قطاعات الطاقة والصناعات المرتبطة بها.',
        },
      },
      {
        id: 'driver-4',
        number: '04',
        title: {
          en: 'Agricultural Potential',
          ar: 'الإمكانات الزراعية',
        },
        description: {
          en: 'Technology-driven farming, food production, and supply chain improvements offer opportunities for sustainable development.',
          ar: 'الزراعة القائمة على التكنولوجيا، وإنتاج الغذاء، وتحسين سلاسل التوريد توفر فرصاً للتنمية المستدامة.',
        },
      },
    ],
  },
  sectorsSection: {
    tagline: {
      en: 'OUR FOCUS SECTORS',
      ar: 'قطاعات تركيزنا',
    },
    title: {
      en: 'Explore Our Investment Areas',
      ar: 'استكشف مجالاتنا الاستثمارية',
    },
    description: {
      en: 'We focus on strategic sectors with the potential to support economic development, create business opportunities, and generate long-term value in Iraq.',
      ar: 'نركز على القطاعات الاستراتيجية التي تمتلك القدرة على دعم التنمية الاقتصادية، وخلق فرص الأعمال، وتوليد قيمة طويلة الأجل في العراق.',
    },
    sectors: [
      {
        id: 'sector-1',
        number: '01',
        title: {
          en: 'Industry',
          ar: 'الصناعة',
        },
        description: {
          en: 'Explore opportunities in industrial development, manufacturing, and production facilities that support economic growth.',
          ar: 'استكشف الفرص في التنمية الصناعية، والتصنيع، ومرافق الإنتاج التي تدعم النمو الاقتصادي.',
        },
        linkUrl: '/investment/industry',
      },
      {
        id: 'sector-2',
        number: '02',
        title: {
          en: 'Commercial Real Estate',
          ar: 'العقارات التجارية',
        },
        description: {
          en: 'Discover opportunities in commercial properties and real estate developments in key economic locations.',
          ar: 'اكتشف الفرص في العقارات التجارية والمشاريع العقارية في المواقع الاقتصادية الرئيسية.',
        },
        linkUrl: '/investment/real-estate',
      },
      {
        id: 'sector-3',
        number: '03',
        title: {
          en: 'Agriculture & Food Production',
          ar: 'الزراعة وإنتاج الغذاء',
        },
        description: {
          en: 'Support modern farming, food production, and agricultural technologies that strengthen local supply chains.',
          ar: 'دعم الزراعة الحديثة، وإنتاج الأغذية، والتقنيات الزراعية التي تعزز سلاسل التوريد المحلية.',
        },
        linkUrl: '/investment/agriculture',
      },
      {
        id: 'sector-4',
        number: '04',
        title: {
          en: 'Energy',
          ar: 'الطاقة',
        },
        description: {
          en: 'Explore investment opportunities across energy infrastructure and related industrial services.',
          ar: 'استكشف فرص الاستثمار في البنية التحتية للطاقة والخدمات الصناعية ذات الصلة.',
        },
        linkUrl: '/investment/energy',
      },
      {
        id: 'sector-5',
        number: '05',
        title: {
          en: 'Technology & Innovation',
          ar: 'التكنولوجيا والابتكار',
        },
        description: {
          en: 'Encourage technology-enabled solutions that improve business operations and support digital development.',
          ar: 'تشجيع الحلول المدعومة بالتكنولوجيا التي تحسن العمليات التجارية وتدعم التطور الرقمي.',
        },
        linkUrl: '/investment/technology',
      },
      {
        id: 'sector-6',
        number: '06',
        title: {
          en: 'Infrastructure',
          ar: 'البنية التحتية',
        },
        description: {
          en: 'Identify opportunities in construction, essential services, and infrastructure development.',
          ar: 'تحديد الفرص في مجالات البناء والخدمات الأساسية وتطوير البنية التحتية.',
        },
        linkUrl: '/investment/infrastructure',
      },
    ],
  },
  environmentSection: {
    tagline: {
      en: 'THE INVESTMENT ENVIRONMENT',
      ar: 'البيئة الاستثمارية',
    },
    title: {
      en: 'Factors Encouraging Investment',
      ar: 'عوامل مشجعة على الاستثمار',
    },
    description: {
      en: 'Several economic and strategic factors can create opportunities for investors exploring the Iraqi market.',
      ar: 'تساهم العديد من العوامل الاقتصادية والاستراتيجية في خلق فرص واعدة للمستثمرين الراغبين في دخول السوق العراقي.',
    },
    factors: [
      {
        id: 'factor-1',
        icon: 'Shield',
        title: {
          en: 'Improving Business Environment',
          ar: 'تحسين بيئة الأعمال',
        },
        description: {
          en: 'Ongoing development and institutional initiatives can help create a more supportive environment for business and investment.',
          ar: 'تساهم المبادرات المؤسسية والتنموية المستمرة في خلق بيئة أكثر دعماً للأعمال والاستثمار.',
        },
      },
      {
        id: 'factor-2',
        icon: 'Shield',
        title: {
          en: 'Strategic Location',
          ar: 'موقع استراتيجي',
        },
        description: {
          en: "Iraq's location connects regional markets and offers potential opportunities for trade, logistics, and commercial development.",
          ar: 'يربط موقع العراق بين الأسواق الإقليمية ويوفر فرصاً واعدة للتجارة والخدمات اللوجستية والتطوير التجاري.',
        },
      },
      {
        id: 'factor-3',
        icon: 'Shield',
        title: {
          en: 'Natural Resources',
          ar: 'الموارد الطبيعية',
        },
        description: {
          en: "The country's natural resource base supports opportunities in energy and industries connected to resource development.",
          ar: 'تدعم قاعدة الموارد الطبيعية في البلاد الفرص المتاحة في مجال الطاقة والصناعات المرتبطة بتطوير الموارد.',
        },
      },
      {
        id: 'factor-4',
        icon: 'Shield',
        title: {
          en: 'Market Potential',
          ar: 'إمكانات السوق',
        },
        description: {
          en: 'Demand for housing, infrastructure, consumer goods, and essential services can create opportunities across multiple sectors.',
          ar: 'يمكن للطلب المتزايد على الإسكان والبنية التحتية والسلع الاستهلاكية والخدمات الأساسية خلق فرص عبر قطاعات متعددة.',
        },
      },
      {
        id: 'factor-5',
        icon: 'Shield',
        title: {
          en: 'Development Initiatives',
          ar: 'مبادرات التنمية',
        },
        description: {
          en: 'Reconstruction and economic development programs may create demand for private-sector expertise, capital, and services.',
          ar: 'قد تؤدي برامج إعادة الإعمار والتنمية الاقتصادية إلى خلق طلب متزايد على خبرات القطاع الخاص ورؤوس الأموال والخدمات.',
        },
      },
      {
        id: 'factor-6',
        icon: 'Shield',
        title: {
          en: 'Strategic Partnerships',
          ar: 'شراكات استراتيجية',
        },
        description: {
          en: 'Collaboration between local businesses, international investors, and financial institutions can help develop investment opportunities.',
          ar: 'التعاون بين الشركات المحلية والمستثمرين الدوليين والمؤسسات المالية يمكن أن يسهم في تطوير فرص استثمارية ناجحة.',
        },
      },
    ],
    foundationBox: {
      title: {
        en: 'Building a Foundation for Investment',
        ar: 'بناء أساس متين للاستثمار',
      },
      description: {
        en: 'Mobtaker Group works to help investors explore opportunities in Iraq by connecting them with relevant local projects, facilitating strategic partnerships, and addressing potential challenges throughout the investment process. Our goal is to support informed investment decisions and contribute to sustainable economic development.',
        ar: 'تعمل مجموعة مبتكر على مساعدة المستثمرين على استكشاف الفرص في العراق من خلال ربطهم بالمشاريع المحلية المناسبة، وتسهيل الشراكات الاستراتيجية، والتغلب على التحديات طوال عملية الاستثمار. هدفنا هو دعم اتخاذ قرارات استثمارية مدروسة والمساهمة في التنمية الاقتصادية المستدامة.',
      },
    },
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

// GET /api/cms/investment
export const getCmsInvestment = async (_req: Request, res: Response): Promise<void> => {
  try {
    let doc = await CmsInvestment.findOne();

    if (!doc) {
      doc = new CmsInvestment(defaultCmsInvestmentData);
      await doc.save();
    } else {
      let modified = false;

      // Migrate header section
      if (!doc.headerSection) {
        doc.headerSection = defaultCmsInvestmentData.headerSection;
        modified = true;
      }
      // Migrate mission section
      if (!doc.missionSection) {
        doc.missionSection = defaultCmsInvestmentData.missionSection;
        modified = true;
      }
      // Migrate drivers section
      if (!doc.driversSection) {
        doc.driversSection = defaultCmsInvestmentData.driversSection;
        modified = true;
      }
      // Migrate sectors section
      if (!doc.sectorsSection) {
        doc.sectorsSection = defaultCmsInvestmentData.sectorsSection;
        modified = true;
      }
      // Migrate environment section
      if (!doc.environmentSection) {
        doc.environmentSection = defaultCmsInvestmentData.environmentSection;
        modified = true;
      }
      // Migrate banner section
      if (!doc.bannerSection) {
        doc.bannerSection = defaultCmsInvestmentData.bannerSection;
        modified = true;
      }

      if (modified) {
        await doc.save();
      }
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error: any) {
    console.error('Error fetching CMS Investment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Investment data',
      error: error.message,
    });
  }
};

// PUT /api/cms/investment or POST /api/cms/investment
export const updateCmsInvestment = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let doc = await CmsInvestment.findOne();

    if (!doc) {
      doc = new CmsInvestment({
        ...defaultCmsInvestmentData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        doc.headerSection = {
          ...doc.headerSection,
          ...updateData.headerSection,
        };
      }
      if (updateData.missionSection) {
        doc.missionSection = {
          ...doc.missionSection,
          ...updateData.missionSection,
        };
      }
      if (updateData.driversSection) {
        doc.driversSection = {
          ...doc.driversSection,
          ...updateData.driversSection,
        };
      }
      if (updateData.sectorsSection) {
        doc.sectorsSection = {
          ...doc.sectorsSection,
          ...updateData.sectorsSection,
        };
      }
      if (updateData.environmentSection) {
        doc.environmentSection = {
          ...doc.environmentSection,
          ...updateData.environmentSection,
        };
      }
      if (updateData.bannerSection) {
        doc.bannerSection = {
          ...doc.bannerSection,
          ...updateData.bannerSection,
        };
      }
    }

    await doc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Investment updated successfully',
      data: doc,
    });
  } catch (error: any) {
    console.error('Error updating CMS Investment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Investment data',
      error: error.message,
    });
  }
};

export default {
  getCmsInvestment,
  updateCmsInvestment,
};
