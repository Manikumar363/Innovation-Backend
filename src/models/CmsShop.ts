import mongoose, { Schema, Document } from 'mongoose';

export interface IBilingualText {
  en: string;
  ar: string;
}

export interface IShopProductBadge {
  id?: string;
  en: string;
  ar: string;
}

export interface IShopProductSpecification {
  id?: string;
  label: IBilingualText;
  value: IBilingualText;
}

export interface IShopProduct {
  id?: string;
  slug?: string;
  image: string;
  images: string[];
  brand: IBilingualText;
  name: IBilingualText;
  description: IBilingualText;
  productDescription: IBilingualText;
  specifications: IShopProductSpecification[];
  badges: IShopProductBadge[];
  buttonText: IBilingualText;
  buttonUrl: string;
}

export interface IShopHeaderSection {
  title: IBilingualText;
  description: IBilingualText;
  products: IShopProduct[];
}

export interface ICmsShop extends Document {
  headerSection: IShopHeaderSection;
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

const ShopProductBadgeSchema = new Schema(
  {
    id: { type: String },
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
  { _id: false }
);

const ShopProductSpecificationSchema = new Schema(
  {
    id: { type: String },
    label: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    value: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
  },
  { _id: false }
);

const ShopProductSchema = new Schema(
  {
    id: { type: String },
    slug: { type: String, default: '' },
    image: { type: String, default: '' },
    images: { type: [String], default: [] },
    brand: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    name: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    description: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    productDescription: { type: BilingualSchema, default: () => ({ en: '', ar: '' }) },
    specifications: { type: [ShopProductSpecificationSchema], default: [] },
    badges: { type: [ShopProductBadgeSchema], default: [] },
    buttonText: {
      type: BilingualSchema,
      default: () => ({ en: 'Request a Quote', ar: 'طلب عرض أسعار' }),
    },
    buttonUrl: { type: String, default: '/contact' },
  },
  { _id: false }
);

const CmsShopSchema = new Schema(
  {
    headerSection: {
      title: { type: BilingualSchema, default: () => ({ en: 'Our Products', ar: 'منتجاتنا' }) },
      description: {
        type: BilingualSchema,
        default: () => ({
          en: 'Explore our range of medical equipment and healthcare solutions. Contact our team to request a quote tailored to your requirements.',
          ar: 'استكشف مجموعتنا من المعدات الطبية والحلول الصحية. تواصل مع فريقنا لطلب عرض أسعار مصمم خصيصاً لاحتياجاتك.',
        }),
      },
      products: { type: [ShopProductSchema], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICmsShop>('CmsShop', CmsShopSchema);

