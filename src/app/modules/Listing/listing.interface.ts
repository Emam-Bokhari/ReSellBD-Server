import { Types } from 'mongoose';

export type TListing = {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'likeNew' | 'used' | 'refurbished';
  images: string[];
  userID?: Types.ObjectId;
  status?: 'available' | 'sold';
  category:
  | 'mobiles'
  | 'electronics'
  | 'vehicles'
  | 'property'
  | 'home'
  | 'pets'
  | 'cloths'
  | 'sports';
  brand?: string;
  location: string;
  negotiable?: "yes" | "no";
  warranty?: string;
  contactNumber?: string;
  isDeleted?: false;
};
