import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IHeroBannerSection {
  logoUrl: string;
  logoText: IBilingualText;
  title: IBilingualText;
  titleHighlight: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
  backgroundImageUrl: string;
}

export interface IAboutSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  imageUrl: string;
}

export interface IWorkTogetherSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  primaryButtonText: IBilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: IBilingualText;
  secondaryButtonUrl: string;
}

export interface ICmsProjectsInnovator extends Document {
  colorTheme: string;
  heroBannerSection: IHeroBannerSection;
  aboutSection: IAboutSection;
  workTogetherSection: IWorkTogetherSection;
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

const CmsProjectsInnovatorSchema = new Schema(
  {
    colorTheme: { type: String, default: 'red' },
    heroBannerSection: {
      logoUrl: { type: String, default: '' },
      logoText: {
        type: BilingualSchema,
        default: () => ({
          en: 'PROJECTS INNOVATOR',
          ar: 'شركة مبتكر المشاريع',
        }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'Building Tomorrow',
          ar: 'بناء الغد',
        }),
      },
      titleHighlight: {
        type: BilingualSchema,
        default: () => ({
          en: 'Through Innovation',
          ar: 'من خلال الابتكار',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
          ar: 'تقديم حلول مبتكرة في البناء والبنية التحتية لتشكيل المساحات الحديثة وبناء مستقبل أفضل.',
        }),
      },
      primaryButtonText: {
        type: BilingualSchema,
        default: () => ({ en: 'Explore Our Services', ar: 'استكشف خدماتنا' }),
      },
      primaryButtonUrl: { type: String, default: '/services' },
      secondaryButtonText: {
        type: BilingualSchema,
        default: () => ({ en: 'Contact Us', ar: 'اتصل بنا' }),
      },
      secondaryButtonUrl: { type: String, default: '/contact' },
      backgroundImageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      },
    },
    aboutSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({
          en: 'ABOUT PROJECTS INNOVATOR',
          ar: 'عن مبتكر المشاريع',
        }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({
          en: 'More Than a Company, A Platform for Sustainable Growth.',
          ar: 'أكثر من مجرد شركة، منصة للنمو المستدام.',
        }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Projects Innovator is the parent and holding entity of Mobtaker Group, operating across multiple sectors including healthcare, construction, trading, and investment. We create value through strategic partnerships, innovation, and a commitment to excellence.',
          ar: 'تعتبر مبتكر المشاريع الكيان القابض والأم لمجموعة مبتكر، وتعمل عبر قطاعات متعددة تشمل الرعاية الصحية، والبناء، والتجارة، والاستثمار. نخلق القيمة من خلال الشراكات الاستراتيجية، والابتكار، والالتزام بالتميز.',
        }),
      },
      imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      },
    },
    workTogetherSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: "LET'S WORK TOGETHER", ar: 'دعنا نعمل معاً' }),
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
          ar: 'هل تبحث عن منتجات طبية، معدات، حلول دوائية، أو خدمات تجارية؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
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

export default mongoose.model<ICmsProjectsInnovator>(
  'CmsProjectsInnovator',
  CmsProjectsInnovatorSchema
);

