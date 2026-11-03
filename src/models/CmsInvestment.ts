import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

// Section 1: Investment Opportunities (Header)
export interface IInvestmentHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
}

// Section 2: Institutional Mission
export interface IInvestmentMissionSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  image: string;
}

// Section 3: Macroeconomic Drivers
export interface IInvestmentDriverItem {
  id?: string;
  number: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface IInvestmentDriversSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  drivers: IInvestmentDriverItem[];
}

// Section 4: Our Focus Sectors
export interface IInvestmentSectorItem {
  id?: string;
  number: string;
  title: IBilingualText;
  description: IBilingualText;
  linkUrl?: string;
}

export interface IInvestmentSectorsSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  sectors: IInvestmentSectorItem[];
}

// Section 5: The Investment Environment
export interface IInvestmentFactorItem {
  id?: string;
  icon: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface IInvestmentFoundationBox {
  title: IBilingualText;
  description: IBilingualText;
}

export interface IInvestmentEnvironmentSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  factors: IInvestmentFactorItem[];
  foundationBox: IInvestmentFoundationBox;
}

// Section 6: Banner Section
export interface IInvestmentBannerSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
}

export interface ICmsInvestment extends Document {
  headerSection: IInvestmentHeaderSection;
  missionSection: IInvestmentMissionSection;
  driversSection: IInvestmentDriversSection;
  sectorsSection: IInvestmentSectorsSection;
  environmentSection: IInvestmentEnvironmentSection;
  bannerSection: IInvestmentBannerSection;
  createdAt: Date;
  updatedAt: Date;
}

const BilingualSchema = new Schema(
  {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
  { _id: false }
);

const DriverItemSchema = new Schema(
  {
    id: { type: String },
    number: { type: String, default: '01' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const SectorItemSchema = new Schema(
  {
    id: { type: String },
    number: { type: String, default: '01' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    linkUrl: { type: String, default: '' },
  },
  { _id: false }
);

const FactorItemSchema = new Schema(
  {
    id: { type: String },
    icon: { type: String, default: 'Shield' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const CmsInvestmentSchema = new Schema(
  {
    headerSection: {
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Investment Opportunities', ar: 'فرص الاستثمار' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore investment opportunities with Mobtaker Group and discover how we create value through innovation, strategic partnerships, and sustainable growth.',
          ar: 'استكشف فرص الاستثمار مع مجموعة مبتكر واكتشف كيف نخلق القيمة من خلال الابتكار والشراكات الاستراتيجية والنمو المستدام.',
        }),
      },
    },
    missionSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: 'INSTITUTIONAL MISSION', ar: 'المهمة المؤسسية' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'Best Investment Solutions for Sustainable National Growth',
          ar: 'أفضل الحلول الاستثمارية لتحقيق نمو وطني مستدام',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: "Mobtaker Group focuses on strategic investment opportunities across commercial real estate, high-throughput industrial facilities, and technology-driven agricultural projects in Iraq's key economic hubs.\n\nWe connect foreign institutional investors with viable, investment-ready domestic opportunities. These carefully selected initiatives help rebuild national infrastructure while creating long-term value for corporate ventures, family offices, and local enterprises.\n\nThrough strategic partners, including Salama Financial Group and leading banking institutions, we aim to facilitate financing solutions, liquidity support, and investment structures designed to manage risk and support sustainable returns.",
          ar: 'تركز مجموعة مبتكر على فرص الاستثمار الاستراتيجي عبر العقارات التجارية، والمرافق الصناعية عالية الإنتاجية، والمشاريع الزراعية القائمة على التكنولوجيا في المراكز الاقتصادية الرئيسية في العراق.\n\nنحن نربط المستثمرين المؤسسيين الأجانب بفرص محلية مجدية وجاهزة للاستثمار. تساعد هذه المبادرات المختارة بعناية في إعادة بناء البنية التحتية الوطنية مع خلق قيمة طويلة الأجل للمشاريع المؤسسية والمكاتب العائلية والشركات المحلية.\n\nمن خلال شركاء استراتيجيين، بما في ذلك مجموعة سلامة المالية والمؤسسات المصرفية الرائدة، نهدف إلى تسهيل حلول التمويل، ودعم السيولة، وهياكل الاستثمار المصممة لإدارة المخاطر ودعم العوائد المستدامة.',
        }),
      },
      image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      },
    },
    driversSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: 'MACROECONOMIC DRIVERS', ar: 'المحركات الاقتصادية الكلية' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Why Invest in Iraq Now?', ar: 'لماذا الاستثمار في العراق الآن؟' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: "Discover the key sectors and economic opportunities shaping Iraq's investment landscape.",
          ar: 'اكتشف القطاعات الرئيسية والفرص الاقتصادية التي تشكل المشهد الاستثماري في العراق.',
        }),
      },
      drivers: { type: [DriverItemSchema], default: [] },
    },
    sectorsSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: 'OUR FOCUS SECTORS', ar: 'قطاعات تركيزنا' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Explore Our Investment Areas', ar: 'استكشف مجالاتنا الاستثمارية' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'We focus on strategic sectors with the potential to support economic development, create business opportunities, and generate long-term value in Iraq.',
          ar: 'نركز على القطاعات الاستراتيجية التي تمتلك القدرة على دعم التنمية الاقتصادية، وخلق فرص الأعمال، وتوليد قيمة طويلة الأجل في العراق.',
        }),
      },
      sectors: { type: [SectorItemSchema], default: [] },
    },
    environmentSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: 'THE INVESTMENT ENVIRONMENT', ar: 'البيئة الاستثمارية' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Factors Encouraging Investment', ar: 'عوامل مشجعة على الاستثمار' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Several economic and strategic factors can create opportunities for investors exploring the Iraqi market.',
          ar: 'تساهم العديد من العوامل الاقتصادية والاستراتيجية في خلق فرص واعدة للمستثمرين الراغبين في دخول السوق العراقي.',
        }),
      },
      factors: { type: [FactorItemSchema], default: [] },
      foundationBox: {
        title: {
          type: BilingualSchema,
          default: () => ({ en: 'Building a Foundation for Investment', ar: 'بناء أساس متين للاستثمار' }),
        },
        description: {
          type: BilingualSchema,
          default: () => ({
            en: 'Mobtaker Group works to help investors explore opportunities in Iraq by connecting them with relevant local projects, facilitating strategic partnerships, and addressing potential challenges throughout the investment process. Our goal is to support informed investment decisions and contribute to sustainable economic development.',
            ar: 'تعمل مجموعة مبتكر على مساعدة المستثمرين على استكشاف الفرص في العراق من خلال ربطهم بالمشاريع المحلية المناسبة، وتسهيل الشراكات الاستراتيجية، والتغلب على التحديات طوال عملية الاستثمار. هدفنا هو دعم اتخاذ قرارات استثمارية مدروسة والمساهمة في التنمية الاقتصادية المستدامة.',
          }),
        },
      },
    },
    bannerSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: "LET'S WORK TOGETHER", ar: 'لنعمل معاً' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: "Let's Build Something That Moves Business Forward.",
          ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
          ar: 'هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
        }),
      },
      primaryButtonText: {
        type: BilingualSchema,
        default: () => ({ en: 'Get a Quote', ar: 'احصل على عرض أسعار' }),
      },
      primaryButtonUrl: { type: String, default: '/contact' },
      secondaryButtonText: {
        type: BilingualSchema,
        default: () => ({ en: 'Contact Us', ar: 'اتصل بنا' }),
      },
      secondaryButtonUrl: { type: String, default: '/contact' },
    },
  },
  {
    timestamps: true,
  }
);

export const CmsInvestment = mongoose.model<ICmsInvestment>('CmsInvestment', CmsInvestmentSchema);
export default CmsInvestment;
