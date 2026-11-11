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

export interface ICmsMedicsInnovator extends Document {
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

const CmsMedicsInnovatorSchema = new Schema(
  {
    colorTheme: { type: String, default: 'red' },
    heroBannerSection: {
      logoUrl: { type: String, default: '' },
      logoText: {
        type: BilingualSchema,
        default: () => ({
          en: 'MEDICS INNOVATOR',
          ar: 'ميديكس إنوفيتور',
        }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'Advancing Healthcare',
          ar: 'الارتقاء بالرعاية الصحية',
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
          en: 'Supplying globally certified medical equipment, diagnostics, and clinical technologies to support modern healthcare facilities and improve lives.',
          ar: 'توريد أجهزة طبية معتمدة عالمياً وحلول تشخيصية وتقنيات سريرية لدعم المرافق الصحية الحديثة وتحسين جودة الحياة.',
        }),
      },
      primaryButtonText: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore Our Products →',
          ar: 'استكشف منتجاتنا ←',
        }),
      },
      primaryButtonUrl: { type: String, default: '/shop' },
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
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
      },
    },

    aboutSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({
          en: 'ABOUT MEDICS INNOVATOR',
          ar: 'عن ميديكس إنوفيتور',
        }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'More Than a Medical Provider, A Partner in Clinical Excellence.',
          ar: 'أكثر من مجرد مزود طبي، شريك في التميز السريري.',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Medics Innovator specializes in delivering certified medical equipment, clinical instrumentation, and hospital infrastructure solutions. We work directly with leading global manufacturers to ensure healthcare providers achieve maximum precision and patient safety.',
          ar: 'تتخصص ميديكس إنوفيتور في تقديم المعدات الطبية المعتمدة والأجهزة السريرية وحلول البنية التحتية للمستشفيات. نعمل مباشرة مع كبرى الشركات المصنعة عالمياً لضمان تحقيق مقدمي الرعاية لأعلى مستويات الدقة وسلامة المرضى.',
        }),
      },
      imageUrl: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
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
          en: 'Partner with Medics Innovator to equip your medical facility with world-class clinical technologies and trusted supplies.',
          ar: 'تشارك مع ميديكس إنوفيتور لتجهيز منشأتك الطبية بأحدث التقنيات السريرية العالمية والإمدادات الموثوقة.',
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

export default mongoose.model<ICmsMedicsInnovator>(
  'CmsMedicsInnovator',
  CmsMedicsInnovatorSchema
);

