import mongoose, { Document, Schema } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IFounderCompanyItem {
  id: string;
  numberBadge: string;
  name: IBilingualText;
  description: IBilingualText;
  linkUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface ICmsFounder extends Document {
  founderProfile: {
    image: string;
    role: IBilingualText;
    name: IBilingualText;
    subtitle: IBilingualText;
  };
  messageSection: {
    eyebrow: IBilingualText;
    heading: IBilingualText;
    greeting: IBilingualText;
    introParagraphs: IBilingualText[];
    companiesHeading: IBilingualText;
    companies: IFounderCompanyItem[];
    closingParagraphs: IBilingualText[];
    signOff: IBilingualText;
    signatureName: IBilingualText;
  };
  showcaseSection: {
    image: string;
    label: IBilingualText;
    title: IBilingualText;
    commitmentCard: {
      label: IBilingualText;
      title: IBilingualText;
      description: IBilingualText;
      linkUrl?: string;
    };
    bottomTagline: IBilingualText;
  };
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

const FounderCompanyItemSchema = new Schema(
  {
    id: { type: String, required: true },
    numberBadge: { type: String, default: '01' },
    name: { type: BilingualSchema, required: true },
    description: { type: BilingualSchema, required: true },
    linkUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const CmsFounderSchema = new Schema<ICmsFounder>(
  {
    founderProfile: {
      image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      },
      role: {
        type: BilingualSchema,
        default: () => ({ en: 'FOUNDER & CEO', ar: 'المؤسس والرئيس التنفيذي' }),
      },
      name: {
        type: BilingualSchema,
        default: () => ({ en: 'Dr. Ahmed Dhahir', ar: 'د. أحمد ظاهر' }),
      },
      subtitle: {
        type: BilingualSchema,
        default: () => ({ en: 'A message from our founder', ar: 'رسالة من مؤسسنا' }),
      },
    },
    messageSection: {
      eyebrow: {
        type: BilingualSchema,
        default: () => ({ en: 'A MESSAGE FROM OUR FOUNDER', ar: 'رسالة من مؤسسنا' }),
      },
      heading: {
        type: BilingualSchema,
        default: () => ({
          en: 'Building a Vision for Lasting Impact',
          ar: 'بناء رؤية ذات أثر مستدام',
        }),
      },
      greeting: {
        type: BilingualSchema,
        default: () => ({
          en: 'Welcome to Mubtaker Group.',
          ar: 'مرحباً بكم في مجموعة مبتكر.',
        }),
      },
      introParagraphs: {
        type: [BilingualSchema],
        default: [],
      },
      companiesHeading: {
        type: BilingualSchema,
        default: () => ({
          en: 'OUR GROUP OF COMPANIES',
          ar: 'مجموعة شركاتنا',
        }),
      },
      companies: {
        type: [FounderCompanyItemSchema],
        default: [],
      },
      closingParagraphs: {
        type: [BilingualSchema],
        default: [],
      },
      signOff: {
        type: BilingualSchema,
        default: () => ({
          en: 'Thank you for being part of our journey.',
          ar: 'شكراً لكونكم جزءاً من رحلتنا.',
        }),
      },
      signatureName: {
        type: BilingualSchema,
        default: () => ({
          en: 'Dr. Ahmed Dhahir',
          ar: 'د. أحمد ظاهر',
        }),
      },
    },
    showcaseSection: {
      image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      },
      label: {
        type: BilingualSchema,
        default: () => ({ en: 'LEADERSHIP', ar: 'القيادة' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'A Vision Built on Trust',
          ar: 'رؤية مبنية على الثقة',
        }),
      },
      commitmentCard: {
        label: {
          type: BilingualSchema,
          default: () => ({ en: 'Our Commitment', ar: 'التزامنا' }),
        },
        title: {
          type: BilingualSchema,
          default: () => ({ en: 'Long-Term Value', ar: 'قيمة طويلة الأمد' }),
        },
        description: {
          type: BilingualSchema,
          default: () => ({
            en: 'Building lasting partnerships through integrity, innovation, and shared success.',
            ar: 'بناء شراكات دائمة من خلال النزاهة والابتكار والنجاح المشترك.',
          }),
        },
        linkUrl: { type: String, default: '/about' },
      },
      bottomTagline: {
        type: BilingualSchema,
        default: () => ({
          en: 'Together, we build opportunities for a better future.',
          ar: 'معاً، نبني فرصاً لمستقبل أفضل.',
        }),
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'cmsfounder',
  }
);

export const CmsFounder = mongoose.model<ICmsFounder>('CmsFounder', CmsFounderSchema);

