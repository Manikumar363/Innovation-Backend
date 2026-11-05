import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IBrandItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  order?: number;
}

export interface ICmsBrandSection extends Document {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  brands: IBrandItem[];
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

const BrandItemSchema = new Schema(
  {
    id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    name: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const CmsBrandSchema = new Schema(
  {
    tagline: {
      type: BilingualSchema,
      default: () => ({
        en: 'TRUSTED BRANDS & PARTNERS',
        ar: 'العلامات التجارية الموثوقة والشركاء',
      }),
    },
    title: {
      type: BilingualSchema,
      default: () => ({
        en: 'Trusted Brands & Partners',
        ar: 'العلامات التجارية والشركاء الموثوقون',
      }),
    },
    description: {
      type: BilingualSchema,
      default: () => ({
        en: 'Partner and investor logos displayed in the trusted brands slider',
        ar: 'شعارات الشركاء والمستثمرين المعروضة في شريط العلامات التجارية الموثوقة',
      }),
    },
    brands: {
      type: [BrandItemSchema],
      default: () => [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'cmsbrands',
  }
);

export const CmsBrand = mongoose.model<ICmsBrandSection>('CmsBrand', CmsBrandSchema);
export default CmsBrand;
