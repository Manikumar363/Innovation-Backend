import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IPartnerCard {
  id?: string;
  logoUrl: string;
  category: IBilingualText;
  name: IBilingualText;
  description: IBilingualText;
  websiteUrl: string;
  linkText: IBilingualText;
}

export interface IPartnersHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
  partners: IPartnerCard[];
}

export interface IPartnersBannerSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
}

export interface ICmsPartners extends Document {
  headerSection: IPartnersHeaderSection;
  bannerSection: IPartnersBannerSection;
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

const PartnerCardSchema = new Schema(
  {
    id: { type: String },
    logoUrl: { type: String, default: '' },
    category: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    name: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    websiteUrl: { type: String, default: '' },
    linkText: {
      type: BilingualSchema,
      default: () => ({ en: 'Visit website', ar: 'زيارة الموقع' }),
    },
  },
  { _id: false }
);

const CmsPartnersSchema = new Schema(
  {
    headerSection: {
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Our Partners', ar: 'شركاؤنا' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Meet the trusted partners who share our vision, strengthen our capabilities, and help us drive innovation and create lasting impact together.',
          ar: 'تعرف على الشركاء الموثوقين الذين يشاركوننا رؤيتنا، ويعززون قدراتنا، ويساعدوننا في دفع عجلة الابتكار وإحداث تأثير دائم معاً.',
        }),
      },
      partners: { type: [PartnerCardSchema], default: [] },
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

export default mongoose.model<ICmsPartners>('CmsPartners', CmsPartnersSchema);

