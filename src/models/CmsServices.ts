import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IServiceFeatureCard {
  id?: string;
  icon: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface IBusinessAreaCard {
  id?: string;
  icon: string;
  title: IBilingualText;
  description: IBilingualText;
  linkUrl: string;
}

export interface IServicesHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
  cards: IServiceFeatureCard[];
}

export interface IServicesBusinessAreasSection {
  title: IBilingualText;
  description: IBilingualText;
  cards: IBusinessAreaCard[];
}

export interface ICmsServices extends Document {
  headerSection: IServicesHeaderSection;
  businessAreasSection: IServicesBusinessAreasSection;
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

const ServiceFeatureCardSchema = new Schema(
  {
    id: { type: String },
    icon: { type: String, default: 'Microscope' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const BusinessAreaCardSchema = new Schema(
  {
    id: { type: String },
    icon: { type: String, default: 'Microscope' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    linkUrl: { type: String, default: '' },
  },
  { _id: false }
);

const CmsServicesSchema = new Schema<ICmsServices>(
  {
    headerSection: {
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Our Services', ar: 'خدماتنا' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Discover our medical equipment, laboratory supplies, and healthcare solutions designed to support healthcare professionals and facilities.',
          ar: 'اكتشف معداتنا الطبية ومستلزمات المختبرات والحلول الصحية المصممة لدعم المتخصصين والمنشآت الصحية.',
        }),
      },
      cards: { type: [ServiceFeatureCardSchema], default: [] },
    },

    businessAreasSection: {
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Our Business Areas', ar: 'مجالات أعمالنا' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore the sectors and services that form the Projects Innovator group.',
          ar: 'استكشف القطاعات والخدمات التي تشكل مجموعة مبتكر المشاريع.',
        }),
      },
      cards: { type: [BusinessAreaCardSchema], default: [] },
    },
  },
  { timestamps: true }
);

export const CmsServices = mongoose.model<ICmsServices>('CmsServices', CmsServicesSchema);
export default CmsServices;

