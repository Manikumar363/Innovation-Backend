import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IContactHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
  enquiryTitle: IBilingualText;
  enquiryDescription: IBilingualText;
}

export interface IOfficeLocation {
  id?: string;
  label: IBilingualText;
  name: IBilingualText;
  addressLine1?: IBilingualText;
  addressLine2: IBilingualText;
  cityCountry: IBilingualText;
  email: string;
  emailLabel: IBilingualText;
  phone?: string;
  phoneLabel?: IBilingualText;
  isPrimary?: boolean;
}

export interface IContactCorporateOfficeSection {
  tagline: IBilingualText;
  title: IBilingualText;
  description: IBilingualText;
  addressLabel: IBilingualText;
  addressLine1: IBilingualText;
  addressLine2: IBilingualText;
  addressCityCountry: IBilingualText;
  emailLabel: IBilingualText;
  emailValue: string;
  phoneLabel: IBilingualText;
  phoneValue: string;
  locations?: IOfficeLocation[];
  workingHoursLabel: IBilingualText;
  workingHoursValue: IBilingualText;
  workingHoursNotes: IBilingualText;
  socialMediaLabel: IBilingualText;
  socialMediaNotes: IBilingualText;
  socialMedia: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  mapLocationUrl: string;
  mapEmbedUrl: string;
  mapButtonText: IBilingualText;
}

export interface ICmsContact extends Document {
  headerSection: IContactHeaderSection;
  corporateOfficeSection: IContactCorporateOfficeSection;
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

const OfficeLocationSchema = new Schema(
  {
    id: { type: String, default: () => `loc-${Date.now()}` },
    label: { type: BilingualSchema, default: () => ({ en: 'Office Address', ar: 'عنوان المكتب' }) },
    name: { type: BilingualSchema, default: () => ({ en: 'Mobtaker Group Headquarters', ar: 'المقر الرئيسي لمجموعة مبتكر' }) },
    addressLine1: { type: BilingualSchema, default: () => ({ en: 'Mobtaker Group Headquarters', ar: 'المقر الرئيسي لمجموعة مبتكر' }) },
    addressLine2: { type: BilingualSchema, default: () => ({ en: 'Al-Mansour District', ar: 'حي المنصور' }) },
    cityCountry: { type: BilingualSchema, default: () => ({ en: 'Baghdad, Iraq', ar: 'بغداد، العراق' }) },
    email: { type: String, default: 'info@mobtakergroup.com' },
    emailLabel: { type: BilingualSchema, default: () => ({ en: 'Email Address', ar: 'البريد الإلكتروني' }) },
    phone: { type: String, default: '+964 (0) 123 456 789' },
    phoneLabel: { type: BilingualSchema, default: () => ({ en: 'Phone Number', ar: 'رقم الهاتف' }) },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const CmsContactSchema = new Schema(
  {
    headerSection: {
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Contact Us', ar: 'اتصل بنا' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Get in touch with our team to discuss your ideas, explore collaboration opportunities, or learn more about our solutions.',
          ar: 'تواصل مع فريقنا لمناقشة أفكارك واستكشاف فرص التعاون أو معرفة المزيد عن حلولنا.',
        }),
      },
      enquiryTitle: {
        type: BilingualSchema,
        default: () => ({ en: 'Send an Enquiry', ar: 'أرسل استفسارك' }),
      },
      enquiryDescription: {
        type: BilingualSchema,
        default: () => ({
          en: 'Have a question or need more information about our services? Fill out the form below, and our team will get back to you.',
          ar: 'هل لديك سؤال أو تحتاج إلى مزيد من المعلومات حول خدماتنا؟ املأ النموذج أدناه وسيقوم فريقنا بالرد عليك.',
        }),
      },
    },
    corporateOfficeSection: {
      tagline: {
        type: BilingualSchema,
        default: () => ({ en: 'GET IN TOUCH', ar: 'تواصل معنا' }),
      },
      title: {
        type: BilingualSchema,
        default: () => ({ en: 'Corporate Office', ar: 'المكتب الرئيسي' }),
      },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Visit our headquarters or contact our team for enquiries and collaboration opportunities.',
          ar: 'تفضل بزيارة مقرنا الرئيسي أو تواصل مع فريقنا للاستفسارات وفرص التعاون.',
        }),
      },
      addressLabel: {
        type: BilingualSchema,
        default: () => ({ en: 'Office Address', ar: 'عنوان المكتب' }),
      },
      addressLine1: {
        type: BilingualSchema,
        default: () => ({
          en: 'Mobtaker Group Headquarters',
          ar: 'المقر الرئيسي لمجموعة مبتكر',
        }),
      },
      addressLine2: {
        type: BilingualSchema,
        default: () => ({
          en: 'Al-Mansour District',
          ar: 'حي المنصور',
        }),
      },
      addressCityCountry: {
        type: BilingualSchema,
        default: () => ({
          en: 'Baghdad, Iraq',
          ar: 'بغداد، العراق',
        }),
      },
      emailLabel: {
        type: BilingualSchema,
        default: () => ({ en: 'Email Address', ar: 'البريد الإلكتروني' }),
      },
      emailValue: {
        type: String,
        default: 'info@mobtakergroup.com',
      },
      phoneLabel: {
        type: BilingualSchema,
        default: () => ({ en: 'Phone Number', ar: 'رقم الهاتف' }),
      },
      phoneValue: {
        type: String,
        default: '+964 (0) 123 456 789',
      },
      locations: {
        type: [OfficeLocationSchema],
        default: [],
      },
      workingHoursLabel: {
        type: BilingualSchema,
        default: () => ({ en: 'Working Hours', ar: 'ساعات العمل' }),
      },
      workingHoursValue: {
        type: BilingualSchema,
        default: () => ({
          en: 'Sunday to Thursday, 9:00 AM to 5:00 PM (Baghdad time)',
          ar: 'من الأحد إلى الخميس، 9:00 صباحاً حتى 5:00 مساءً (توقيت بغداد)',
        }),
      },
      workingHoursNotes: {
        type: BilingualSchema,
        default: () => ({
          en: '[Owner to confirm. Suggested: Sunday to Thursday, 9:00 AM to 5:00 PM (Baghdad time).]',
          ar: '[بانتظار تأكيد المالك. المقترح: من الأحد إلى الخميس، 9:00 صباحاً إلى 5:00 مساءً (توقيت بغداد).]',
        }),
      },
      socialMediaLabel: {
        type: BilingualSchema,
        default: () => ({ en: 'Social Media', ar: 'وسائل التواصل الاجتماعي' }),
      },
      socialMediaNotes: {
        type: BilingualSchema,
        default: () => ({
          en: '[Owner to provide links.]',
          ar: '[بانتظار تزويد الروابط من المالك.]',
        }),
      },
      socialMedia: {
        linkedin: { type: String, default: '' },
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' },
      },
      mapLocationUrl: {
        type: String,
        default: 'https://maps.google.com/?q=Al-Mansour,Baghdad,Iraq',
      },
      mapEmbedUrl: {
        type: String,
        default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106637.74798679462!2d44.31688691512807!3d33.31524103134958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9a7d3298c92a95c4!2sBaghdad%2C%20Iraq!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
      },
      mapButtonText: {
        type: BilingualSchema,
        default: () => ({ en: 'Open in Maps', ar: 'فتح في خرائط جوجل' }),
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICmsContact>('CmsContact', CmsContactSchema);

