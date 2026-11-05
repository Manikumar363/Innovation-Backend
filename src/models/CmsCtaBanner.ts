import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface ICmsCtaBanner extends Document {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
  isActive: boolean;
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

const CmsCtaBannerSchema = new Schema(
  {
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
        ar: 'هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية، أو خدمات أعمال؟ فريقنا مستعد لمساعدتك في العثور على ما تحتاجه.',
      }),
    },
    primaryButtonText: {
      type: BilingualSchema,
      default: () => ({ en: 'Get a Quote', ar: 'احصل على عرض سعر' }),
    },
    primaryButtonUrl: {
      type: String,
      default: '/contact',
    },
    secondaryButtonText: {
      type: BilingualSchema,
      default: () => ({ en: 'Contact Us', ar: 'اتصل بنا' }),
    },
    secondaryButtonUrl: {
      type: String,
      default: '/contact',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'cmsctabanners',
  }
);

export const CmsCtaBanner = mongoose.model<ICmsCtaBanner>('CmsCtaBanner', CmsCtaBannerSchema);
export default CmsCtaBanner;
