'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Contact = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/moduleSpecific/queryFilters');
const contactSchema = new mongoose_1.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    services: {
      type: [String],
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
contactSchema.pre('find', queryFilters_1.excludeDeletedQuery);
contactSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
contactSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
