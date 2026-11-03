import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface ICompanyCard {
  id?: string;
  icon: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface ICompanyHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
}

export interface ICompanyWhoWeAreSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description1: IBilingualText;
  description2: IBilingualText;
  cards: ICompanyCard[];
}

export interface ICompanyPrincipleItem {
  id?: string;
  en: string;
  ar: string;
}

export interface ICompanyDownloadBox {
  title: IBilingualText;
  description: IBilingualText;
  buttonText: IBilingualText;
  pdfUrl: string;
  pdfName?: string;
}

export interface ICompanyWhatGuidesUsSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  principles: ICompanyPrincipleItem[];
  downloadBox: ICompanyDownloadBox;
}

export interface ICmsCompany extends Document {
  headerSection: ICompanyHeaderSection;
  whoWeAreSection: ICompanyWhoWeAreSection;
  whatGuidesUsSection: ICompanyWhatGuidesUsSection;
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

const CompanyCardSchema = new Schema(
  {
    id: { type: String },
    icon: { type: String, default: 'Building2' },
    title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const CompanyPrincipleSchema = new Schema(
  {
    id: { type: String },
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
  { _id: false }
);

const CmsCompanySchema = new Schema<ICmsCompany>(
  {
    headerSection: {
      title: { type: BilingualSchema, default: () => ({ en: 'Company Profile', ar: 'ملف الشركة' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Learn more about Mobtaker Group, our vision, and our commitment to innovation and sustainable growth.',
          ar: 'تعرف أكثر على مجموعة مبتكر، ورؤيتنا، والتزامنا بالابتكار والنمو المستدام.',
        }),
      },
    },

    whoWeAreSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'WHO WE ARE', ar: 'من نحن' }) },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'Building Opportunities Through Innovation and Collaboration',
          ar: 'بناء الفرص من خلال الابتكار والتعاون',
        }),
      },
      description1: {
        type: BilingualSchema,
        default: () => ({
          en: 'Mobtaker Group is a diversified business organization focused on identifying opportunities, developing strategic relationships, and supporting initiatives that contribute to economic and business development.',
          ar: 'مجموعة مبتكر هي مؤسسة أعمال متنوعة تركز على تحديد الفرص، وبناء علاقات استراتيجية، ودعم المبادرات التي تسهم في التنمية الاقتصادية والتجارية.',
        }),
      },
      description2: {
        type: BilingualSchema,
        default: () => ({
          en: 'We aim to connect ideas, expertise, and resources to help businesses explore new possibilities. Through collaboration and a forward-looking approach, we strive to build lasting relationships with clients, partners, and stakeholders.',
          ar: 'نهدف إلى ربط الأفكار والخبرات والموارد لمساعدة الشركات في استكشاف إمكانيات جديدة. من خلال التعاون والنهج المستقبلي، نسعى جاهدين لبناء علاقات دائمة مع العملاء والشركاء والجهات المعنية.',
        }),
      },
      cards: { type: [CompanyCardSchema], default: [] },
    },

    whatGuidesUsSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'WHAT GUIDES US', ar: 'ما يوجهنا' }) },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'The Principles Behind Our Work',
          ar: 'المبادئ الكامنة وراء عملنا',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'We believe sustainable business relationships are built through trust, responsibility, and a shared commitment to progress.',
          ar: 'نؤمن بأن علاقات الأعمال المستدامة تُبنى من خلال الثقة والمسؤولية والالتزام المشترك بالتقدم.',
        }),
      },
      principles: { type: [CompanyPrincipleSchema], default: [] },
      downloadBox: {
        title: {
          type: BilingualSchema,
          default: () => ({
            en: 'Download Our Company Profile',
            ar: 'تحميل ملف الشركة التعريفي',
          }),
        },
        description: {
          type: BilingualSchema,
          default: () => ({
            en: 'Explore our company overview, vision, mission, and business approach in our company profile document.',
            ar: 'استكشف نظرة عامة على شركتنا ورؤيتها ورسالتها ونهجها التجاري في وثيقة ملف الشركة.',
          }),
        },
        buttonText: {
          type: BilingualSchema,
          default: () => ({
            en: 'Download Company Profile (PDF)',
            ar: 'تحميل ملف الشركة (PDF)',
          }),
        },
        pdfUrl: { type: String, default: '' },
        pdfName: { type: String, default: 'company-profile.pdf' },
      },
    },
  },
  { timestamps: true }
);

export const CmsCompany = mongoose.model<ICmsCompany>('CmsCompany', CmsCompanySchema);
export default CmsCompany;

