import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IProductBadgeItem {
  id?: string;
  en: string;
  ar: string;
}

export interface IProductItem {
  id: string;
  image: string;
  brand: IBilingualText;
  name: IBilingualText;
  description: IBilingualText;
  badges: IProductBadgeItem[];
  buttonText: IBilingualText;
  buttonUrl: string;
}

export interface IHeroBannerSection {
  logoUrl: string;
  logoText: IBilingualText;
  title: IBilingualText;
  titleHighlight: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
  backgroundImageUrl: string;
}

export interface IAboutSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  imageUrl: string;
}

export interface IProductsSection {
  title: IBilingualText;
  description: IBilingualText;
  products: IProductItem[];
  viewAllButtonText: IBilingualText;
  viewAllButtonUrl: string;
}

export interface IWorkTogetherSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
}

export interface ICmsAttractive extends Document {
  colorTheme: string;
  heroBannerSection: IHeroBannerSection;
  aboutSection: IAboutSection;
  productsSection: IProductsSection;
  workTogetherSection: IWorkTogetherSection;
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

const ProductBadgeSchema = new Schema(
  {
    id: { type: String },
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
  { _id: false }
);

const ProductItemSchema = new Schema(
  {
    id: { type: String, required: true },
    image: { type: String, default: '' },
    brand: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    name: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    badges: { type: [ProductBadgeSchema], default: [] },
    buttonText: {
      type: BilingualSchema,
      default: () => ({ en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' }),
    },
    buttonUrl: { type: String, default: '/contact' },
  },
  { _id: false }
);

const CmsAttractiveSchema = new Schema(
  {
    colorTheme: { type: String, default: 'blue' },
    heroBannerSection: {
      logoUrl: { type: String, default: '' },
      logoText: {
        type: BilingualSchema,
        default: () => ({
          en: 'ATTRACTIVE',
          ar: 'أتراكتيف',
        }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'Building Tomorrow',
          ar: 'بناء الغد',
        }),
      },
      titleHighlight: {
        type: BilingualSchema,
        default: () => ({
          en: 'Through Innovation',
          ar: 'من خلال الابتكار',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Delivering innovative solutions, high-grade medical systems, and modern infrastructure that shape a better future.',
          ar: 'تقديم حلول مبتكرة وأنظمة طبية متطورة وبنية تحتية حديثة تشكل مستقبلاً أفضل.',
        }),
      },
      primaryButtonText: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore Our Services →',
          ar: 'استكشف خدماتنا ←',
        }),
      },
      primaryButtonUrl: { type: String, default: '/services' },
      secondaryButtonText: {
        type: BilingualSchema,
        default: () => ({
          en: 'Contact Us',
          ar: 'اتصل بنا',
        }),
      },
      secondaryButtonUrl: { type: String, default: '/contact' },
      backgroundImageUrl: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
      },
    },

    aboutSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({
          en: 'ABOUT ATTRACTIVE',
          ar: 'عن أتراكتيف',
        }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'More Than a Company, A Platform for Sustainable Growth.',
          ar: 'أكثر من مجرد شركة، منصة للنمو المستدام.',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Attractive drives excellence across healthcare, advanced equipment, and modern commerce. We forge enduring partnerships and implement state-of-the-art technological solutions that elevate everyday life and drive organizational growth.',
          ar: 'تقود أتراكتيف التميز عبر الرعاية الصحية والمعدات المتقدمة والتجارة الحديثة. نحن نبني شراكات دائمة ونطبق حلولاً تكنولوجية متطورة ترتقي بالحياة اليومية وتدفع النمو المؤسسي.',
        }),
      },
      imageUrl: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      },
    },

    productsSection: {
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'Our Products',
          ar: 'منتجاتنا',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore our range of high-quality medical equipment and solutions designed to meet your needs.',
          ar: 'استكشف مجموعتنا من المعدات والحلول الطبية عالية الجودة والمصممة لتلبية احتياجاتك.',
        }),
      },
      products: {
        type: [ProductItemSchema],
        default: () => [
          {
            id: 'prod-1',
            image:
              'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
            brand: { en: 'MedTech', ar: 'ميدتيك' },
            name: { en: 'Patient Monitor', ar: 'شاشة مراقبة المريض' },
            description: {
              en: 'A medical monitoring device designed to track vital signs and support patient observation in clinical environments.',
              ar: 'جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم مراقبة المرضى في البيئات السريرية.',
            },
            badges: [
              { id: 'b1', en: 'CE Certified', ar: 'معتمد من CE' },
              { id: 'b2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
              { id: 'b3', en: 'ISO Certified', ar: 'معتمد من ISO' },
            ],
            buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
            buttonUrl: '/contact',
          },
          {
            id: 'prod-2',
            image:
              'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
            brand: { en: 'SonoCare', ar: 'سونوكير' },
            name: { en: 'Digital Ultrasound System', ar: 'نظام الموجات فوق الصوتية الرقمي' },
            description: {
              en: 'An ultrasound imaging system designed to support diagnostic examinations in hospitals and healthcare facilities.',
              ar: 'نظام تصوير بالموجات فوق الصوتية مصمم لدعم الفحوصات التشخيصية في المستشفيات والمرافق الصحية.',
            },
            badges: [
              { id: 'b4', en: 'CE Certified', ar: 'معتمد من CE' },
              { id: 'b5', en: 'ISO Certified', ar: 'معتمد من ISO' },
            ],
            buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
            buttonUrl: '/contact',
          },
          {
            id: 'prod-3',
            image:
              'https://images.unsplash.com/photo-1583912267670-6575ad3726f9?auto=format&fit=crop&w=600&q=80',
            brand: { en: 'CareFlow', ar: 'كيرفلو' },
            name: { en: 'Infusion Pump', ar: 'مضخة التسريب الوريدي' },
            description: {
              en: 'A medical device designed for the controlled delivery of fluids and medications in clinical settings.',
              ar: 'جهاز طبي مصمم للتحكم الدقيق في توصيل السوائل والأدوية في البيئات السريرية.',
            },
            badges: [
              { id: 'b6', en: 'CE Certified', ar: 'معتمد من CE' },
              { id: 'b7', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
            ],
            buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
            buttonUrl: '/contact',
          },
        ],
      },
      viewAllButtonText: {
        type: BilingualSchema,
        default: () => ({
          en: 'View All Products',
          ar: 'عرض جميع المنتجات',
        }),
      },
      viewAllButtonUrl: { type: String, default: '/shop' },
    },

    workTogetherSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({
          en: "— LET'S WORK TOGETHER —",
          ar: '— لنعمل معاً —',
        }),
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
          en: 'Partner with Attractive to innovate and deliver cutting-edge solutions across modern enterprise and healthcare sectors.',
          ar: 'شارك أتراكتيف للابتكار وتقديم حلول متطورة عبر قطاعات الأعمال الحديثة والرعاية الصحية.',
        }),
      },
      primaryButtonText: {
        type: BilingualSchema,
        default: () => ({
          en: 'Get a Quote ↗',
          ar: 'احصل على عرض أسعار ↗',
        }),
      },
      primaryButtonUrl: { type: String, default: '/contact' },
      secondaryButtonText: {
        type: BilingualSchema,
        default: () => ({
          en: 'Contact Us',
          ar: 'اتصل بنا',
        }),
      },
      secondaryButtonUrl: { type: String, default: '/contact' },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICmsAttractive>('CmsAttractive', CmsAttractiveSchema);

