import mongoose, { Schema, Document } from 'mongoose';

export type QuoteStatus = 'pending' | 'in_review' | 'contacted' | 'completed' | 'cancelled';

export interface IQuoteRequest extends Document {
  productName: string;
  productId?: string;
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  quantity: number;
  additionalRequirements?: string;
  status: QuoteStatus;
  adminNotes?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      default: 'General Inquiry',
    },
    productId: {
      type: String,
      trim: true,
      default: '',
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    businessEmail: {
      type: String,
      required: [true, 'Business email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Required quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      default: 1,
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'in_review', 'contacted', 'completed', 'cancelled'],
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
    collection: 'quoterequests',
  }
);

// Indexes for fast searching and sorting
QuoteRequestSchema.index({ createdAt: -1 });
QuoteRequestSchema.index({ businessEmail: 1 });
QuoteRequestSchema.index({ productName: 1 });

export const QuoteRequest = mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema);
export default QuoteRequest;

