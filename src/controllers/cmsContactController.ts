import { Request, Response } from 'express';
import CmsContact from '../models/CmsContact';

export const defaultCmsContactData = {
  headerSection: {
    title: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    description: {
      en: 'Get in touch with our team to discuss your ideas, explore collaboration opportunities, or learn more about our solutions.',
      ar: 'تواصل مع فريقنا لمناقشة أفكارك واستكشاف فرص التعاون أو معرفة المزيد عن حلولنا.',
    },
    enquiryTitle: {
      en: 'Send an Enquiry',
      ar: 'أرسل استفسارك',
    },
    enquiryDescription: {
      en: 'Have a question or need more information about our services? Fill out the form below, and our team will get back to you.',
      ar: 'هل لديك سؤال أو تحتاج إلى مزيد من المعلومات حول خدماتنا؟ املأ النموذج أدناه وسيقوم فريقنا بالرد عليك.',
    },
  },
  corporateOfficeSection: {
    tagline: {
      en: 'GET IN TOUCH',
      ar: 'تواصل معنا',
    },
    title: {
      en: 'Corporate Office',
      ar: 'المكتب الرئيسي',
    },
    description: {
      en: 'Visit our headquarters or contact our team for enquiries and collaboration opportunities.',
      ar: 'تفضل بزيارة مقرنا الرئيسي أو تواصل مع فريقنا للاستفسارات وفرص التعاون.',
    },
    addressLabel: {
      en: 'Office Address',
      ar: 'عنوان المكتب',
    },
    addressLine1: {
      en: 'Mobtaker Group Headquarters',
      ar: 'المقر الرئيسي لمجموعة مبتكر',
    },
    addressLine2: {
      en: 'Al-Mansour District',
      ar: 'حي المنصور',
    },
    addressCityCountry: {
      en: 'Baghdad, Iraq',
      ar: 'بغداد، العراق',
    },
    emailLabel: {
      en: 'Email Address',
      ar: 'البريد الإلكتروني',
    },
    emailValue: 'info@mobtakergroup.com',
    phoneLabel: {
      en: 'Phone Number',
      ar: 'رقم الهاتف',
    },
    phoneValue: '+964 (0) 123 456 789',
    mapLocationUrl: 'https://maps.google.com/?q=Al-Mansour,Baghdad,Iraq',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106637.74798679462!2d44.31688691512807!3d33.31524103134958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9a7d3298c92a95c4!2sBaghdad%2C%20Iraq!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    mapButtonText: {
      en: 'Open in Maps',
      ar: 'فتح في خرائط جوجل',
    },
  },
};

// GET /api/cms/contact
export const getCmsContact = async (_req: Request, res: Response): Promise<void> => {
  try {
    let contactDoc = await CmsContact.findOne();

    if (!contactDoc) {
      contactDoc = new CmsContact(defaultCmsContactData);
      await contactDoc.save();
    } else {
      let modified = false;

      // Migrate header section
      if (!contactDoc.headerSection) {
        contactDoc.headerSection = defaultCmsContactData.headerSection;
        modified = true;
      } else {
        if (!contactDoc.headerSection.title || (!contactDoc.headerSection.title.en && !contactDoc.headerSection.title.ar)) {
          contactDoc.headerSection.title = defaultCmsContactData.headerSection.title;
          modified = true;
        }
        if (!contactDoc.headerSection.description || (!contactDoc.headerSection.description.en && !contactDoc.headerSection.description.ar)) {
          contactDoc.headerSection.description = defaultCmsContactData.headerSection.description;
          modified = true;
        }
        if (!contactDoc.headerSection.enquiryTitle || (!contactDoc.headerSection.enquiryTitle.en && !contactDoc.headerSection.enquiryTitle.ar)) {
          contactDoc.headerSection.enquiryTitle = defaultCmsContactData.headerSection.enquiryTitle;
          modified = true;
        }
        if (!contactDoc.headerSection.enquiryDescription || (!contactDoc.headerSection.enquiryDescription.en && !contactDoc.headerSection.enquiryDescription.ar)) {
          contactDoc.headerSection.enquiryDescription = defaultCmsContactData.headerSection.enquiryDescription;
          modified = true;
        }
      }

      // Migrate corporate office section
      if (!contactDoc.corporateOfficeSection) {
        contactDoc.corporateOfficeSection = defaultCmsContactData.corporateOfficeSection;
        modified = true;
      } else {
        if (!contactDoc.corporateOfficeSection.title || (!contactDoc.corporateOfficeSection.title.en && !contactDoc.corporateOfficeSection.title.ar)) {
          contactDoc.corporateOfficeSection.title = defaultCmsContactData.corporateOfficeSection.title;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.emailValue) {
          contactDoc.corporateOfficeSection.emailValue = defaultCmsContactData.corporateOfficeSection.emailValue;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.phoneValue) {
          contactDoc.corporateOfficeSection.phoneValue = defaultCmsContactData.corporateOfficeSection.phoneValue;
          modified = true;
        }
      }

      if (modified) {
        await contactDoc.save();
      }
    }

    res.status(200).json({
      success: true,
      data: contactDoc,
    });
  } catch (error: any) {
    console.error('Error fetching CMS Contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CMS Contact data',
      error: error.message,
    });
  }
};

// PUT /api/cms/contact or POST /api/cms/contact
export const updateCmsContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = req.body;

    let contactDoc = await CmsContact.findOne();

    if (!contactDoc) {
      contactDoc = new CmsContact({
        ...defaultCmsContactData,
        ...updateData,
      });
    } else {
      if (updateData.headerSection) {
        contactDoc.headerSection = {
          ...contactDoc.headerSection,
          ...updateData.headerSection,
        };
      }
      if (updateData.corporateOfficeSection) {
        contactDoc.corporateOfficeSection = {
          ...contactDoc.corporateOfficeSection,
          ...updateData.corporateOfficeSection,
        };
      }
    }

    await contactDoc.save();

    res.status(200).json({
      success: true,
      message: 'CMS Contact updated successfully',
      data: contactDoc,
    });
  } catch (error: any) {
    console.error('Error updating CMS Contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update CMS Contact data',
      error: error.message,
    });
  }
};

