import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IProjectCard {
  id?: string;
  category: IBilingualText;
  status: IBilingualText;
  statusType: 'completed' | 'ongoing' | 'planned';
  title: IBilingualText;
  description: IBilingualText;
  linkUrl?: string;
}

export interface IProjectsHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
  projects: IProjectCard[];
}

export interface IProjectsBannerSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
}

export interface ICmsProjects extends Document {
  headerSection: IProjectsHeaderSection;
  bannerSection: IProjectsBannerSection;
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

const ProjectCardSchema = new Schema(
  {
    id: { type: String },
    category: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    status: { type: BilingualSchema, default: () => ({ en: 'Ongoing', ar: 'قيد التنفيذ' }) },
    statusType: {
      type: String,
      enum: ['completed', 'ongoing', 'planned'],
      default: 'ongoing',
    },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    linkUrl: { type: String, default: '' },
  },
  { _id: false }
);

const CmsProjectsSchema = new Schema(
  {
    headerSection: {
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Our Projects', ar: 'مشاريعنا' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore our projects, discover innovative ideas, and see how we turn our vision into impactful solutions that create lasting value.',
          ar: 'استكشف مشاريعنا، واكتشف الأفكار المبتكرة، وشاهد كيف نحول رؤيتنا إلى حلول مؤثرة تخلق قيمة دائمة.',
        }),
      },
      projects: { type: [ProjectCardSchema], default: [] },
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

export default mongoose.model<ICmsProjects>('CmsProjects', CmsProjectsSchema);

