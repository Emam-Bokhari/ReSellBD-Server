import { model, Schema } from 'mongoose';
import { TListing } from './listing.interface';

const listingSchema = new Schema<TListing>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: {
        values: ['new', 'likeNew', 'used', 'refurbished'],
        message: '{VALUE} is not a valid condition',
      },
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    userID: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: {
        values: ['available', 'sold'],
        message: '{VALUE} is not a valid status',
      },
      default: 'available',
    },
    category: {
      type: String,
      enum: {
        values: [
          'mobiles',
          'electronics',
          'vehicles',
          'property',
          'home',
          'pets',
          'cloths',
          'sports',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    brand: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    negotiable: {
      type: Boolean,
    },
    warranty: {
      type: String,
      enum: {
        values: ['yes', 'no'],
        message: '{VALUE} is not a valid warranty',
      },
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Listing = model<TListing>('Listing', listingSchema);
