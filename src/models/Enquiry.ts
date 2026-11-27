import mongoose, { Schema, Document } from 'mongoose';

export type EnquiryStatus = 'pending' | 'in_review' | 'contacted' | 'resolved' | 'cancelled';
export type EnquiryType = 'General' | 'Request Price' | 'Investment' | 'Partnership' | 'Careers';

export interface IEnquiry extends Document {
  fullName: string;
  email: string;
  company?: string;
  enquiryType: EnquiryType;
  subject: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    enquiryType: {
      type: String,
      enum: ['General', 'Request Price', 'Investment', 'Partnership', 'Careers'],
      default: 'General',
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_review', 'contacted', 'resolved', 'cancelled'],
      default: 'pending',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'website',
    },
  },
  {
    timestamps: true,
    collection: 'enquiries',
  }
);

EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ email: 1 });
EnquirySchema.index({ subject: 1 });
EnquirySchema.index({ company: 1 });
EnquirySchema.index({ enquiryType: 1 });

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
export default Enquiry;
