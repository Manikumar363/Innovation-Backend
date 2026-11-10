import mongoose, { Document, Schema } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IOurCompanyItem {
  id?: string;
  name: IBilingualText;
  description: IBilingualText;
  logoUrl: string;
  websiteUrl: string;
  color?: string;
  order?: number;
  isActive?: boolean;
}

export interface ICmsOurCompanies extends Document {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  companies: IOurCompanyItem[];
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

const OurCompanyItemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: BilingualSchema, required: true },
    description: { type: BilingualSchema, required: true },
    logoUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    color: { type: String, default: 'blue' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const CmsOurCompaniesSchema = new Schema<ICmsOurCompanies>(
  {
    tagline: {
      type: BilingualSchema,
      default: () => ({
        en: 'SPECIALIZED COMPANIES & DIVISIONS',
        ar: 'الشركات والأقسام المتخصصة',
      }),
    },
    title: {
      type: BilingualSchema,
      default: () => ({
        en: 'Our Companies',
        ar: 'شركاتنا',
      }),
    },
    description: {
      type: BilingualSchema,
      default: () => ({
        en: 'A diversified ecosystem of specialized entities driving excellence across infrastructure, medical technology, and trading.',
        ar: 'منظومة متنوعة من الكيانات المتخصصة التي تقود التميز في البنية التحتية والتكنولوجيا الطبية والتجارة.',
      }),
    },
    companies: {
      type: [OurCompanyItemSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'cmsourcompanies',
  }
);

export const CmsOurCompanies = mongoose.model<ICmsOurCompanies>(
  'CmsOurCompanies',
  CmsOurCompaniesSchema
);

