import mongoose, { Document, Schema } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IFounder {
  name: IBilingualText;
  description: IBilingualText;
  image?: string;
}

export interface IHeroSection {
  mainTitle: IBilingualText;
  headingTag: IBilingualText;
  description: IBilingualText;
  founder: IFounder;
}

export interface ITrustedBrand {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

export interface ISectorItem {
  id?: string;
  title: IBilingualText;
  description?: IBilingualText;
  icon?: string;
}

export interface IAboutSectorsSection {
  image?: string;
  title: IBilingualText;
  description: IBilingualText;
  location: IBilingualText;
  sectors: ISectorItem[];
}

// Section 4: Specialized Companies
export interface ICompanyItem {
  id?: string;
  name: IBilingualText;
  description: IBilingualText;
  logoUrl: string;
  websiteUrl?: string;
}

export interface ICompaniesSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  companies: ICompanyItem[];
}

// Section 5: Purpose, Vision & Mission
export interface IPurposeTag {
  id?: string;
  title: IBilingualText;
  description: IBilingualText;
}

export interface IPurposeSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  image?: string;
  tags: IPurposeTag[];
}

// Section 6: Banner
export interface IBannerSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl?: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl?: string;
}

export interface ICmsHome extends Document {
  hero: IHeroSection;
  trustedBrands: ITrustedBrand[];
  aboutSectorsSection: IAboutSectorsSection;
  companiesSection: ICompaniesSection;
  purposeSection: IPurposeSection;
  bannerSection: IBannerSection;
  updatedAt: Date;
  createdAt: Date;
}

const BilingualSchema = new Schema(
  {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
  { _id: false }
);

const CmsHomeSchema = new Schema<ICmsHome>(
  {
    hero: {
      mainTitle: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
      headingTag: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
      description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
      founder: {
        name: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
        description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
        image: { type: String, default: '' },
      },
    },
    trustedBrands: [
      {
        name: { type: String, default: '' },
        logoUrl: { type: String, default: '' },
        websiteUrl: { type: String, default: '' },
      },
    ],
    aboutSectorsSection: {
      image: { type: String, default: '' },
      title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
      description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
      location: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
      sectors: [
        {
          id: { type: String, default: '' },
          title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
          description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
          icon: { type: String, default: '' },
        },
      ],
    },
    companiesSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR COMPANIES', ar: 'شركاتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Three Specialized Divisions. One Group', ar: 'ثلاثة أقسام متخصصة. مجموعة واحدة' }) },
      description: { type: BilingualSchema, default: () => ({ en: 'Discover the specialized companies driving innovation and excellence across our group.', ar: 'اكتشف الشركات المتخصصة التي تقود الابتكار والتميز عبر مجموعتنا.' }) },
      companies: [
        {
          id: { type: String, default: '' },
          name: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
          description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
          logoUrl: { type: String, default: '' },
          websiteUrl: { type: String, default: '' },
        },
      ],
    },
    purposeSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: 'OUR PURPOSE', ar: 'هدفنا ورسالتنا' }) },
      title: { type: BilingualSchema, default: () => ({ en: 'Driven by Vision. Defined by Purpose.', ar: 'مدفوعون بالرؤية. محددون بالهدف.' }) },
      description: { type: BilingualSchema, default: () => ({ en: 'We bring businesses and people together through strategic investment, responsible development, and long-term partnerships.', ar: 'نجمع بين الأعمال والأفراد من خلال الاستثمار الاستراتيجي والتطوير المسؤول والشراكات طويلة الأجل.' }) },
      image: { type: String, default: '' },
      tags: [
        {
          id: { type: String, default: '' },
          title: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
          description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
        },
      ],
    },
    bannerSection: {
      tagline: { type: BilingualSchema, default: () => ({ en: "LET'S WORK TOGETHER", ar: 'لنعمل معاً' }) },
      title: { type: BilingualSchema, default: () => ({ en: "Let's Build Something That Moves Business Forward.", ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.' }) },
      description: { type: BilingualSchema, default: () => ({ en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.', ar: 'هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية، أو خدمات أعمال؟ فريقنا مستعد لمساعدتك في العثور على ما تحتاجه.' }) },
      primaryButtonText: { type: BilingualSchema, default: () => ({ en: 'Get a Quote', ar: 'احصل على عرض سعر' }) },
      primaryButtonUrl: { type: String, default: '/contact' },
      secondaryButtonText: { type: BilingualSchema, default: () => ({ en: 'Contact Us', ar: 'اتصل بنا' }) },
      secondaryButtonUrl: { type: String, default: '/contact' },
    },
  },
  { timestamps: true }
);

export const CmsHome = mongoose.model<ICmsHome>('CmsHome', CmsHomeSchema);
