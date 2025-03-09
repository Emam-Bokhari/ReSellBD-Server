'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Transaction = void 0;
const mongoose_1 = require('mongoose');
const transactionSchema = new mongoose_1.Schema(
  {
    buyerID: {
      type: mongoose_1.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    sellerID: {
      type: mongoose_1.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    itemID: {
      type: mongoose_1.Schema.ObjectId,
      required: true,
      ref: 'Listing',
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'completed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['online'],
        message: '{VALUE} is not a valid payment method',
      },
      default: 'online',
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
