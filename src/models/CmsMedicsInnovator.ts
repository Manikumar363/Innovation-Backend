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

export interface ICmsMedicsInnovator extends Document {
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

