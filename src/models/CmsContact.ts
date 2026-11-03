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

