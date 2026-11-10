import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IKeyFeatureItem {
  id?: string;
  icon: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface IWhyChooseItem {
  id?: string;
  icon?: string;
  text: IBilingualText;
}

export interface IServicePage extends Document {
  slug: string;
  title: IBilingualText;
  subtitle: IBilingualText;
  icon: string;
  order: number;
  isActive: boolean;

  // Split section (Overview & Key Features)
  overview: {
    badge: IBilingualText;
    heading: IBilingualText;
    paragraphs: IBilingualText[];
    keyFeaturesTitle: IBilingualText;
    keyFeatures: IKeyFeatureItem[];
  };

  // Why choose our solutions section
  whyChoose: {
    badge: IBilingualText;
    heading: IBilingualText;
    items: IWhyChooseItem[];
  };

  // Bottom CTA section
  ctaBanner: {
    heading: IBilingualText;
    description: IBilingualText;
    buttonText?: IBilingualText;
    buttonLink?: string;
  };

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

const KeyFeatureItemSchema = new Schema(
  {
    id: { type: String },
    icon: { type: String, default: 'Target' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const WhyChooseItemSchema = new Schema(
  {
    id: { type: String },
    icon: { type: String, default: 'CheckCircle2' },
    text: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const ServicePageSchema = new Schema<IServicePage>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: BilingualSchema,
      required: true,
      default: () => ({ en: 'New Service', ar: 'خدمة جديدة' }),
    },
    subtitle: {
      type: BilingualSchema,
      default: () => ({ en: '', ar: '' }),
    },
    icon: {
      type: String,
      default: 'Microscope',
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    overview: {
      badge: {
        type: BilingualSchema,
        default: () => ({ en: 'SERVICE SOLUTIONS', ar: 'حلول الخدمات' }),
      },
      heading: {
        type: BilingualSchema,
        default: () => ({ en: 'Advanced Solutions for Better Outcomes', ar: 'حلول متقدمة لنتائج أفضل' }),
      },
      paragraphs: {
        type: [BilingualSchema],
        default: [],
      },
      keyFeaturesTitle: {
        type: BilingualSchema,
        default: () => ({ en: 'Key Features', ar: 'الميزات الرئيسية' }),
      },
      keyFeatures: {
        type: [KeyFeatureItemSchema],
        default: [],
      },
    },

    whyChoose: {
      badge: {
        type: BilingualSchema,
        default: () => ({ en: 'WHY CHOOSE OUR SOLUTIONS', ar: 'لماذا تختار حلولنا' }),
      },
      heading: {
        type: BilingualSchema,
        default: () => ({ en: '', ar: '' }),
      },
      items: {
        type: [WhyChooseItemSchema],
        default: [],
      },
    },

    ctaBanner: {
      heading: {
        type: BilingualSchema,
        default: () => ({ en: 'Find the Right Solution for Your Facility', ar: 'اعثر على الحل المناسب لمنشأتك' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Contact our team to discuss your requirements and explore suitable solutions.',
          ar: 'اتصل بفريقنا لمناقشة متطلباتك واستكشاف الحلول المناسبة.',
        }),
      },
      buttonText: {
        type: BilingualSchema,
        default: () => ({ en: 'Submit Quote Request', ar: 'طلب عرض أسعار' }),
      },
      buttonLink: {
        type: String,
        default: '/quotes',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IServicePage>('ServicePage', ServicePageSchema);

