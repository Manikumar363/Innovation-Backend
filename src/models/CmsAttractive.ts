import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
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

