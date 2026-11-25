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
    locations: [
      {
        id: 'loc-1',
        label: { en: 'Office Address', ar: 'عنوان المكتب' },
        name: { en: 'Mobtaker Group Headquarters', ar: 'المقر الرئيسي لمجموعة مبتكر' },
        addressLine1: { en: 'Mobtaker Group Headquarters', ar: 'المقر الرئيسي لمجموعة مبتكر' },
        addressLine2: { en: 'Al-Mansour District', ar: 'حي المنصور' },
        cityCountry: { en: 'Baghdad, Iraq', ar: 'بغداد، العراق' },
        email: 'info@mobtakergroup.com',
        emailLabel: { en: 'Email Address', ar: 'البريد الإلكتروني' },
        phone: '+964 (0) 123 456 789',
        phoneLabel: { en: 'Phone Number', ar: 'رقم الهاتف' },
        isPrimary: true,
      },
    ],
    workingHoursLabel: {
      en: 'Working Hours',
      ar: 'ساعات العمل',
    },
    workingHoursValue: {
      en: 'Sunday to Thursday, 9:00 AM to 5:00 PM (Baghdad time)',
      ar: 'من الأحد إلى الخميس، 9:00 صباحاً حتى 5:00 مساءً (توقيت بغداد)',
    },
    workingHoursNotes: {
      en: '[Owner to confirm. Suggested: Sunday to Thursday, 9:00 AM to 5:00 PM (Baghdad time).]',
      ar: '[بانتظار تأكيد المالك. المقترح: من الأحد إلى الخميس، 9:00 صباحاً إلى 5:00 مساءً (توقيت بغداد).]',
    },
    socialMediaLabel: {
      en: 'Social Media',
      ar: 'وسائل التواصل الاجتماعي',
    },
    socialMediaNotes: {
      en: '[Owner to provide links.]',
      ar: '[بانتظار تزويد الروابط من المالك.]',
    },
    socialMedia: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
    },
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
        if (!contactDoc.corporateOfficeSection.workingHoursLabel || !contactDoc.corporateOfficeSection.workingHoursLabel.en) {
          contactDoc.corporateOfficeSection.workingHoursLabel = defaultCmsContactData.corporateOfficeSection.workingHoursLabel;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.workingHoursValue || !contactDoc.corporateOfficeSection.workingHoursValue.en) {
          contactDoc.corporateOfficeSection.workingHoursValue = defaultCmsContactData.corporateOfficeSection.workingHoursValue;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.workingHoursNotes || !contactDoc.corporateOfficeSection.workingHoursNotes.en) {
          contactDoc.corporateOfficeSection.workingHoursNotes = defaultCmsContactData.corporateOfficeSection.workingHoursNotes;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.socialMediaLabel || !contactDoc.corporateOfficeSection.socialMediaLabel.en) {
          contactDoc.corporateOfficeSection.socialMediaLabel = defaultCmsContactData.corporateOfficeSection.socialMediaLabel;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.socialMediaNotes || !contactDoc.corporateOfficeSection.socialMediaNotes.en) {
          contactDoc.corporateOfficeSection.socialMediaNotes = defaultCmsContactData.corporateOfficeSection.socialMediaNotes;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.socialMedia) {
          contactDoc.corporateOfficeSection.socialMedia = defaultCmsContactData.corporateOfficeSection.socialMedia;
          modified = true;
        }
        if (!contactDoc.corporateOfficeSection.locations || contactDoc.corporateOfficeSection.locations.length === 0) {
          contactDoc.corporateOfficeSection.locations = [
            {
              id: 'loc-1',
              label: contactDoc.corporateOfficeSection.addressLabel || defaultCmsContactData.corporateOfficeSection.addressLabel,
              name: contactDoc.corporateOfficeSection.addressLine1 || defaultCmsContactData.corporateOfficeSection.addressLine1,
              addressLine1: contactDoc.corporateOfficeSection.addressLine1 || defaultCmsContactData.corporateOfficeSection.addressLine1,
              addressLine2: contactDoc.corporateOfficeSection.addressLine2 || defaultCmsContactData.corporateOfficeSection.addressLine2,
              cityCountry: contactDoc.corporateOfficeSection.addressCityCountry || defaultCmsContactData.corporateOfficeSection.addressCityCountry,
              email: contactDoc.corporateOfficeSection.emailValue || defaultCmsContactData.corporateOfficeSection.emailValue,
              emailLabel: contactDoc.corporateOfficeSection.emailLabel || defaultCmsContactData.corporateOfficeSection.emailLabel,
              phone: contactDoc.corporateOfficeSection.phoneValue || defaultCmsContactData.corporateOfficeSection.phoneValue,
              phoneLabel: contactDoc.corporateOfficeSection.phoneLabel || defaultCmsContactData.corporateOfficeSection.phoneLabel,
              isPrimary: true,
            },
          ];
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

        // If locations were provided, sync primary location to top-level fields
        const locs = updateData.corporateOfficeSection.locations;
        if (Array.isArray(locs) && locs.length > 0) {
          const primary = locs.find((l: any) => l.isPrimary) || locs[0];
          if (primary) {
            if (primary.label) contactDoc.corporateOfficeSection.addressLabel = primary.label;
            if (primary.name || primary.addressLine1) {
              contactDoc.corporateOfficeSection.addressLine1 = primary.name || primary.addressLine1;
            }
            if (primary.addressLine2) contactDoc.corporateOfficeSection.addressLine2 = primary.addressLine2;
            if (primary.cityCountry) contactDoc.corporateOfficeSection.addressCityCountry = primary.cityCountry;
            if (primary.email) contactDoc.corporateOfficeSection.emailValue = primary.email;
            if (primary.emailLabel) contactDoc.corporateOfficeSection.emailLabel = primary.emailLabel;
            if (primary.phone) contactDoc.corporateOfficeSection.phoneValue = primary.phone;
            if (primary.phoneLabel) contactDoc.corporateOfficeSection.phoneLabel = primary.phoneLabel;
          }
        }
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

/**
 * Dedicated POST endpoint to update multiple office physical addresses and email contacts
 * POST /api/cms/contact/locations or /api/cms/contact/addresses
 */
export const updateContactLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawLocations = req.body.locations || req.body.addresses || req.body;
    const locationsArray = Array.isArray(rawLocations) ? rawLocations : [];

    let contactDoc = await CmsContact.findOne();
    if (!contactDoc) {
      contactDoc = new CmsContact(defaultCmsContactData);
    }

    contactDoc.corporateOfficeSection.locations = locationsArray;

    // Sync primary location to top-level fields
    if (locationsArray.length > 0) {
      const primary = locationsArray.find((l: any) => l.isPrimary) || locationsArray[0];
      if (primary) {
        if (primary.label) contactDoc.corporateOfficeSection.addressLabel = primary.label;
        if (primary.name || primary.addressLine1) {
          contactDoc.corporateOfficeSection.addressLine1 = primary.name || primary.addressLine1;
        }
        if (primary.addressLine2) contactDoc.corporateOfficeSection.addressLine2 = primary.addressLine2;
        if (primary.cityCountry) contactDoc.corporateOfficeSection.addressCityCountry = primary.cityCountry;
        if (primary.email) contactDoc.corporateOfficeSection.emailValue = primary.email;
        if (primary.emailLabel) contactDoc.corporateOfficeSection.emailLabel = primary.emailLabel;
        if (primary.phone) contactDoc.corporateOfficeSection.phoneValue = primary.phone;
        if (primary.phoneLabel) contactDoc.corporateOfficeSection.phoneLabel = primary.phoneLabel;
      }
    }

    await contactDoc.save();

    res.status(200).json({
      success: true,
      message: 'Office physical addresses and email contacts updated successfully',
      data: contactDoc,
    });
  } catch (error: any) {
    console.error('Error updating contact locations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact office locations and email data',
      error: error.message,
    });
  }
};

