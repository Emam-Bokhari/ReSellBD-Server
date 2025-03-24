'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Listing = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/moduleSpecific/queryFilters');
const listingSchema = new mongoose_1.Schema(
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
      type: mongoose_1.Schema.ObjectId,
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
      type: String,
      enum: {
        values: ['yes', 'no'],
        message: '{VALUE} is not a valid negotiable',
      },
    },
    warranty: {
      type: String,
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
// query middleware for soft delete by utils
listingSchema.pre('find', queryFilters_1.excludeDeletedQuery);
listingSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregation middleware for soft delete by utils
listingSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Listing = (0, mongoose_1.model)('Listing', listingSchema);
