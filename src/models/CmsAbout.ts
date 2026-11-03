import mongoose, { Document, Schema } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

// Section 1: Page Header
export interface IAboutHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
}

// Section 2: Heritage / Story
export interface IAboutHeritageSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  image: string;
  badgeYear: string;
  badgeText: IBilingualText;
}

// Section 3: Journey / Milestones
export interface IAboutJourneyItem {
  id?: string;
  number: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface IAboutJourneySection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  items: IAboutJourneyItem[];
}

// Section 4: Impact in Numbers
export interface IAboutStatItem {
  id?: string;
  number: string;
  description: IBilingualText;
}

export interface IAboutImpactSection {
  tagline: IBilingualText;
  title: IBilingualText;
  stats: IAboutStatItem[];
}

// Section 5: Our Leadership
export interface IAboutLeaderItem {
  id?: string;
  name: IBilingualText;
  role: IBilingualText;
  image: string;
}

export interface IAboutLeadershipSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  leaders: IAboutLeaderItem[];
}

// Section 6: Our Management Team
export interface IAboutManagementMember {
  id?: string;
  name: IBilingualText;
  role: IBilingualText;
  image: string;
}

export interface IAboutManagementDivision {
  id?: string;
  badge: string; // e.g. "PI", "AT", "MI"
  companyName: IBilingualText;
  description: IBilingualText;
  linkText: IBilingualText;
  linkUrl: string;
  logoUrl?: string;
  members: IAboutManagementMember[];
}

export interface IAboutManagementSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  divisions: IAboutManagementDivision[];
}

// Section 7: Our Core Values
export interface IAboutCoreValueItem {
  id?: string;
  number: string; // e.g. "01", "02"
  icon: string;   // e.g. "Handshake", "Headphones", "Users", "Scale", "Lightbulb", "ShieldCheck"
  title: IBilingualText;
  description: IBilingualText;
}

export interface IAboutCoreValuesSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  values: IAboutCoreValueItem[];
}

// Section 8: Our History & Ownership
export interface IAboutHistoryItem {
  id?: string;
  number: string; // e.g. "01", "02"
  icon: string;   // e.g. "History", "Building2"
  title: IBilingualText;
  description: IBilingualText;
}

export interface IAboutHistorySection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  items: IAboutHistoryItem[];
}

// Section 9: Our Purpose
export interface IAboutObjectiveItem {
  id?: string;
  number: string; // e.g. "01", "02", "03"
  icon: string;   // e.g. "Target", "HandHeart", "ShieldCheck"
  title: IBilingualText;
}

export interface IAboutPurposeSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  highlightTitle: IBilingualText;
  highlightDescription: IBilingualText;
  highlightIcon: string;
  objectivesTagline: IBilingualText;
  objectivesTitle: IBilingualText;
  objectives: IAboutObjectiveItem[];
}

// Section 10: Call to Action Banner
export interface IAboutBannerSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
}

export interface ICmsAbout extends Document {
  headerSection: IAboutHeaderSection;
  heritageSection: IAboutHeritageSection;
  journeySection: IAboutJourneySection;
  impactSection: IAboutImpactSection;
  leadershipSection: IAboutLeadershipSection;
  managementSection: IAboutManagementSection;
  coreValuesSection: IAboutCoreValuesSection;
  historySection: IAboutHistorySection;
  purposeSection: IAboutPurposeSection;
  bannerSection: IAboutBannerSection;
  updatedAt: Date;
  createdAt: Date;
}

const BilingualSchema = new Schema(
  {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
  { _id: false }
);

const CmsAboutSchema = new Schema<ICmsAbout>(
  {
    headerSection: {
      title: { type: BilingualSchema, default: () => ({ en: 'About Us', ar: 'من نحن' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Discover our heritage, explore our journey of evolution, and learn about the vision, values, and leadership that drive our commitment to innovation and excellence.',
          ar: 'اكتشف تراثنا، واستكشف مسيرة تطورنا، وتعرف على الرؤية والقيم والقيادة التي تقود التزامنا بالابتكار والتميز.',
        }),
      },
    },
    heritageSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR HERITAGE', ar: 'تراثنا وعراقتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Built on Trust. Driven by Ambition.', ar: 'مبني على الثقة. مدفوع بالطموح.' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Mobtaker Group brings together specialized businesses under a shared commitment to excellence, trusted partnerships, and sustainable growth.',
          ar: 'تجمع مجموعة مبتكر بين الشركات المتخصصة تحت التزام مشترك بالتميز والشراكات الموثوقة والنمو المستدام.',
        }),
      },
      image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      },
      badgeYear: { type: String, default: '2017' },
      badgeText: { type: BilingualSchema, default: () => ({ en: 'Established', ar: 'سنة التأسيس' }) },
    },
    journeySection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR JOURNEY', ar: 'مسيرتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Evolving Through Opportunity', ar: 'التطور من خلال الفرص' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Our journey reflects a commitment to adapting, expanding, and creating lasting value across industries.',
          ar: 'تعكس مسيرتنا التزاماً بالتكيف والتوسع وخلق قيمة دائمة عبر مختلف القطاعات.',
        }),
      },
      items: [
        {
          id: { type: String, default: 'journey-1' },
          number: { type: String, default: '01' },
          title: {
            type: BilingualSchema,
            default: () => ({ en: 'Building a Strong Foundation', ar: 'بناء أساس قوي' }),
          },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'Establishing trusted relationships and developing a foundation for sustainable business growth.',
              ar: 'بناء علاقات موثوقة وتطوير أساس لنمو الأعمال المستدام.',
            }),
          },
        },
        {
          id: { type: String, default: 'journey-2' },
          number: { type: String, default: '02' },
          title: {
            type: BilingualSchema,
            default: () => ({ en: 'Expanding Our Horizons', ar: 'توسيع آفاقنا' }),
          },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'Growing across specialized sectors and exploring opportunities through strategic partnerships.',
              ar: 'النمو عبر القطاعات المتخصصة واستكشاف الفرص من خلال الشراكات الاستراتيجية.',
            }),
          },
        },
      ],
    },
    impactSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR ACHIEVEMENTS', ar: 'إنجازاتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Our Impact in Numbers', ar: 'أثرنا بالأرقام' }) },
      stats: [
        {
          id: { type: String, default: 'stat-1' },
          number: { type: String, default: '20+' },
          description: {
            type: BilingualSchema,
            default: () => ({ en: 'Years of Excellence', ar: 'سنوات من التميز' }),
          },
        },
        {
          id: { type: String, default: 'stat-2' },
          number: { type: String, default: '500+' },
          description: {
            type: BilingualSchema,
            default: () => ({ en: 'Satisfied Customers', ar: 'عميل راضٍ' }),
          },
        },
        {
          id: { type: String, default: 'stat-3' },
          number: { type: String, default: '140+' },
          description: {
            type: BilingualSchema,
            default: () => ({ en: 'Projects Delivered', ar: 'مشروع منجز' }),
          },
        },
      ],
    },
    leadershipSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR LEADERSHIP', ar: 'قيادتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'The People Behind Our Progress', ar: 'الأشخاص وراء تقدمنا' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Meet the leadership and teams working together to deliver quality, innovation, and lasting value across our group.',
          ar: 'تعرف على القيادة وفرق العمل التي تعمل معاً لتقديم الجودة والابتكار وقيمة دائمة عبر مجموعتنا.',
        }),
      },
      leaders: [
        {
          id: { type: String, default: 'leader-1' },
          name: { type: BilingualSchema, default: () => ({ en: 'Dr. Ahmed Dhahir', ar: 'د. أحمد ظاهر' }) },
          role: { type: BilingualSchema, default: () => ({ en: 'Founder & CEO', ar: 'المؤسس والرئيس التنفيذي' }) },
          image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          },
        },
      ],
    },
    managementSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR LEADERSHIP & MANAGEMENT', ar: 'فريق الإدارة والقيادة' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Our Management Team', ar: 'فريق الإدارة لدينا' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Specialized executive leadership across our three group divisions.',
          ar: 'قيادة تنفيذية متخصصة عبر أقسام مجموعتنا الثلاثة.',
        }),
      },
      divisions: [
        {
          id: { type: String, default: 'div-1' },
          badge: { type: String, default: 'PI' },
          companyName: { type: BilingualSchema, default: () => ({ en: 'Projects Innovator', ar: 'مبتكر المشاريع' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
              ar: 'تقديم حلول بناء وبنية تحتية مبتكرة تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
            }),
          },
          linkText: { type: BilingualSchema, default: () => ({ en: 'Projects Innovator ↗', ar: 'مبتكر المشاريع ↗' }) },
          linkUrl: { type: String, default: '/projects-innovator' },
          logoUrl: { type: String, default: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80' },
          members: [
            {
              id: { type: String, default: 'member-1-1' },
              name: { type: BilingualSchema, default: () => ({ en: 'Management Member 1', ar: 'عضو الإدارة 1' }) },
              role: { type: BilingualSchema, default: () => ({ en: 'General Manager', ar: 'المدير العام' }) },
              image: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
            },
            {
              id: { type: String, default: 'member-1-2' },
              name: { type: BilingualSchema, default: () => ({ en: 'Management Member 2', ar: 'عضو الإدارة 2' }) },
              role: { type: BilingualSchema, default: () => ({ en: 'Operations Manager', ar: 'مدير العمليات' }) },
              image: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
            },
          ],
        },
        {
          id: { type: String, default: 'div-2' },
          badge: { type: String, default: 'AT' },
          companyName: { type: BilingualSchema, default: () => ({ en: 'Attractive', ar: 'أتراكتيف' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
              ar: 'مجموعة أعمال متنوعة تقود التميز عبر الرعاية الصحية، البناء، التجارة، والاستثمار.',
            }),
          },
          linkText: { type: BilingualSchema, default: () => ({ en: 'Attractive ↗', ar: 'أتراكتيف ↗' }) },
          linkUrl: { type: String, default: '/attractive' },
          logoUrl: { type: String, default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80' },
          members: [
            {
              id: { type: String, default: 'member-2-1' },
              name: { type: BilingualSchema, default: () => ({ en: 'Management Member 1', ar: 'عضو الإدارة 1' }) },
              role: { type: BilingualSchema, default: () => ({ en: 'General Manager', ar: 'المدير العام' }) },
              image: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
            },
            {
              id: { type: String, default: 'member-2-2' },
              name: { type: BilingualSchema, default: () => ({ en: 'Management Member 2', ar: 'عضو الإدارة 2' }) },
              role: { type: BilingualSchema, default: () => ({ en: 'Operations Manager', ar: 'مدير العمليات' }) },
              image: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
            },
          ],
        },
        {
          id: { type: String, default: 'div-3' },
          badge: { type: String, default: 'MI' },
          companyName: { type: BilingualSchema, default: () => ({ en: 'Medics Innovator', ar: 'ميديكس إنوفيتور' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
              ar: 'الارتقاء بالرعاية الصحية من خلال حلول طبية موثوقة ومنتجات رعاية صحية عالية الجودة والتزام بنتائج أفضل للمرضى.',
            }),
          },
          linkText: { type: BilingualSchema, default: () => ({ en: 'Medics Innovator ↗', ar: 'ميديكس إنوفيتور ↗' }) },
          linkUrl: { type: String, default: '/medics-innovator' },
          logoUrl: { type: String, default: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80' },
          members: [
            {
              id: { type: String, default: 'member-3-1' },
              name: { type: BilingualSchema, default: () => ({ en: 'Management Member 1', ar: 'عضو الإدارة 1' }) },
              role: { type: BilingualSchema, default: () => ({ en: 'General Manager', ar: 'المدير العام' }) },
              image: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
            },
            {
              id: { type: String, default: 'member-3-2' },
              name: { type: BilingualSchema, default: () => ({ en: 'Management Member 2', ar: 'عضو الإدارة 2' }) },
              role: { type: BilingualSchema, default: () => ({ en: 'Operations Manager', ar: 'مدير العمليات' }) },
              image: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
            },
          ],
        },
      ],
    },
    coreValuesSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'WHAT WE STAND FOR', ar: 'ما نمثله ونلتزم به' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Our Core Values', ar: 'قيمنا الجوهرية' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'The principles that guide our decisions, shape our actions, and define the relationships we build with our clients, partners, and communities.',
          ar: 'المبادئ التي توجه قراراتنا، وتشكل أفعالنا، وتحدد العلاقات التي نبنيها مع عملائنا وشركائنا ومجتمعاتنا.',
        }),
      },
      values: [
        {
          id: { type: String, default: 'val-1' },
          number: { type: String, default: '01' },
          icon: { type: String, default: 'Handshake' },
          title: { type: BilingualSchema, default: () => ({ en: 'Relationships', ar: 'العلاقات والشراكات' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'We build lasting relationships through trust, transparency, and a genuine commitment to understanding and supporting our clients.',
              ar: 'نبني علاقات دائمة من خلال الثقة والشفافية والالتزام الحقيقي بفهم ودعم عملائنا.',
            }),
          },
        },
        {
          id: { type: String, default: 'val-2' },
          number: { type: String, default: '02' },
          icon: { type: String, default: 'Headphones' },
          title: { type: BilingualSchema, default: () => ({ en: 'Service', ar: 'الخدمة المتميزة' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'We strive to deliver responsive, reliable, and high-quality service that addresses our clients\' needs and exceeds expectations.',
              ar: 'نسعى جاهدين لتقديم خدمة سريعة وموثوقة وعالية الجودة تلبي احتياجات عملائنا وتتجاوز التوقعات.',
            }),
          },
        },
        {
          id: { type: String, default: 'val-3' },
          number: { type: String, default: '03' },
          icon: { type: String, default: 'Users' },
          title: { type: BilingualSchema, default: () => ({ en: 'Partnership & Counsel', ar: 'الشراكة والمشورة' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'We work alongside our partners, offering thoughtful guidance, shared expertise, and collaborative solutions that create lasting value.',
              ar: 'نعمل جنباً إلى جنب مع شركائنا، ونقدم توجيهاً مدروساً، وخبرات مشتركة، وحلولاً تعاونية تخلق قيمة دائمة.',
            }),
          },
        },
        {
          id: { type: String, default: 'val-4' },
          number: { type: String, default: '04' },
          icon: { type: String, default: 'Scale' },
          title: { type: BilingualSchema, default: () => ({ en: 'Diversity', ar: 'التنوع والشمولية' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'We value diverse perspectives, experiences, and ideas, recognizing that inclusion strengthens our teams and drives better outcomes.',
              ar: 'نقدر وجهات النظر والخبرات والأفكار المتنوعة، مدركين أن الشمولية تقوي فرقنا وتحقق نتائج أفضل.',
            }),
          },
        },
        {
          id: { type: String, default: 'val-5' },
          number: { type: String, default: '05' },
          icon: { type: String, default: 'Lightbulb' },
          title: { type: BilingualSchema, default: () => ({ en: 'Opportunity', ar: 'الفرص والابتكار' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'We identify opportunities for progress and growth, helping businesses and people turn promising ideas into meaningful results.',
              ar: 'نحدد فرص التقدم والنمو، ونساعد الشركات والأفراد على تحويل الأفكار الواعدة إلى نتائج ذات مغزى.',
            }),
          },
        },
        {
          id: { type: String, default: 'val-6' },
          number: { type: String, default: '06' },
          icon: { type: String, default: 'ShieldCheck' },
          title: { type: BilingualSchema, default: () => ({ en: 'Authenticity', ar: 'المصداقية والأصالة' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'We act with integrity, remain true to our commitments, and build trust through honest communication and responsible decisions.',
              ar: 'نتصرف بنزاهة، ونبقى أوفياء لالتزاماتنا، ونبني الثقة من خلال التواصل الصادق والقرارات المسؤولة.',
            }),
          },
        },
      ],
    },
    historySection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR BACKGROUND', ar: 'خلفيتنا وتاريخنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Our History & Ownership', ar: 'تاريخنا وهيكلية الملكية' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Discover the foundations of our business, the expertise behind our journey, and the framework that supports our continued growth.',
          ar: 'اكتشف أسس أعمالنا، والخبرة الكامنة وراء مسيرتنا، والإطار الذي يدعم نمونا المستمر.',
        }),
      },
      items: [
        {
          id: { type: String, default: 'hist-1' },
          number: { type: String, default: '01' },
          icon: { type: String, default: 'History' },
          title: { type: BilingualSchema, default: () => ({ en: 'Brief History', ar: 'نبذة تاريخية' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'Salama was established in 2020, with its headquarters in Baghdad, Iraq. The company specializes in administrative services and investment consultancy across insurance, healthcare, healthcare management, industry, construction, infrastructure, investment, and agriculture. Salama serves as a bridge between businesses and stakeholders, helping facilitate collaboration and achieve efficient, sustainable, and successful outcomes. In its early years, the company established partnerships with several major local and international businesses.',
              ar: 'تأسست سلامة في عام 2020، ومقرها الرئيسي في بغداد، العراق. وتتخصص الشركة في الخدمات الإدارية والاستشارات الاستثمارية عبر التأمين والرعاية الصحية وإدارة الرعاية الصحية والصناعة والبناء والبنية التحتية والاستثمار والزراعة. وتعمل سلامة كجسر بين الشركات وأصحاب المصلحة، مما يساعد على تسهيل التعاون وتحقيق نتائج فعالة ومستدامة وناجحة.',
            }),
          },
        },
        {
          id: { type: String, default: 'hist-2' },
          number: { type: String, default: '02' },
          icon: { type: String, default: 'Building2' },
          title: { type: BilingualSchema, default: () => ({ en: 'Shareholding Structure', ar: 'هيكلية المساهمة والملكية' }) },
          description: {
            type: BilingualSchema,
            default: () => ({
              en: 'Salama\'s shareholding structure outlines the ownership framework behind the company and the interests represented in its business. For an accurate overview of shareholders, ownership percentages, and governance arrangements, refer to the company\'s official corporate documentation.',
              ar: 'تحدد هيكلية المساهمة في سلامة إطار الملكية وراء الشركة والمصالح الممثلة في أعمالها. للحصول على نظرة دقيقة على المساهمين ونسب الملكية وترتيبات الحوكمة، يرجى الرجوع إلى الوثائق الرسمية للشركة.',
            }),
          },
        },
      ],
    },
    purposeSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR PURPOSE', ar: 'هدفنا وغايتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Driving Progress Through Clear Objectives', ar: 'دفع عجلة التقدم من خلال أهداف واضحة' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'We partner with like-minded organizations to promote sustainability and develop practical solutions. By collaborating with communities, government bodies, and businesses, we bring together expertise, resources, and influence to create positive change, strengthen stakeholder relationships, and uphold ethical business practices.',
          ar: 'نحن نتشارك مع المنظمات ذات التفكير المماثل لتعزيز الاستدامة وتطوير حلول عملية. من خلال التعاون مع المجتمعات والهيئات الحكومية والشركات، نجمع بين الخبرة والموارد والتأثير لإحداث تغيير إيجابي وتعزيز علاقات أصحاب المصلحة ودعم ممارسات الأعمال الأخلاقية.',
        }),
      },
      highlightTitle: { type: BilingualSchema, default: () => ({ en: 'Committed to Shared Progress', ar: 'ملتزمون بالتقدم المشترك' }) },
      highlightDescription: {
        type: BilingualSchema,
        default: () => ({
          en: 'We believe meaningful results come from responsible management, community engagement, and trusted client partnerships.',
          ar: 'نحن نؤمن بأن النتائج ذات المغزى تأتي من الإدارة المسؤولة، والمشاركة المجتمعية، والشراكات الموثوقة مع العملاء.',
        }),
      },
      highlightIcon: { type: String, default: 'Heart' },
      objectivesTagline: { type: BilingualSchema, default: () => ({ en: 'OUR PRIORITIES', ar: 'أولوياتنا' }) },
      objectivesTitle: { type: BilingualSchema, default: () => ({ en: 'Our Objectives', ar: 'أهدافنا' }) },
      objectives: [
        {
          id: { type: String, default: 'obj-1' },
          number: { type: String, default: '01' },
          icon: { type: String, default: 'Target' },
          title: { type: BilingualSchema, default: () => ({ en: 'Effective Project Management', ar: 'إدارة المشاريع الفعالة' }) },
        },
        {
          id: { type: String, default: 'obj-2' },
          number: { type: String, default: '02' },
          icon: { type: String, default: 'HandHeart' },
          title: { type: BilingualSchema, default: () => ({ en: 'Contributing to Community Service', ar: 'المساهمة في خدمة المجتمع' }) },
        },
        {
          id: { type: String, default: 'obj-3' },
          number: { type: String, default: '03' },
          icon: { type: String, default: 'ShieldCheck' },
          title: { type: BilingualSchema, default: () => ({ en: 'Becoming a Trusted Partner for Our Clients', ar: 'أن نصبح شريكاً موثوقاً لعملائنا' }) },
        },
      ],
    },
    bannerSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: "LET'S WORK TOGETHER", ar: 'لنعمل معاً' }) },
      title: { type: BilingualSchema, default: () => ({ en: "Let's Build Something That Moves Business Forward.", ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
          ar: 'هل تبحث عن منتجات طبية أو معدات أو حلول صيدلانية أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
        }),
      },
      primaryButtonText: { type: BilingualSchema, default: () => ({ en: 'Get a Quote', ar: 'احصل على عرض سعر' }) },
      primaryButtonUrl: { type: String, default: '/contact' },
      secondaryButtonText: { type: BilingualSchema, default: () => ({ en: 'Contact Us', ar: 'اتصل بنا' }) },
      secondaryButtonUrl: { type: String, default: '/contact' },
    },
  },
  { timestamps: true }
);

export const CmsAbout = mongoose.model<ICmsAbout>('CmsAbout', CmsAboutSchema);
