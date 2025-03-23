'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AnalyticsServices =
  exports.getTotalSales =
  exports.getTotalPurchases =
  exports.getTotalProductsAdded =
    void 0;
const HttpError_1 = require('../../errors/HttpError');
const listing_model_1 = require('../Listing/listing.model');
const transaction_model_1 = require('../Transaction/transaction.model');
const user_model_1 = require('../User/user.model');
const getTotalProductsAdded = (identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    return listing_model_1.Listing.countDocuments({
      userID: user._id,
      isDeleted: false,
    });
  });
exports.getTotalProductsAdded = getTotalProductsAdded;
const getTotalPurchases = (identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    return transaction_model_1.Transaction.countDocuments({
      buyerID: user._id,
      status: 'completed',
    });
  });
exports.getTotalPurchases = getTotalPurchases;
const getTotalSales = (identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    // find all transactions where the seller matches the user's ID and the status is 'completed'
    const transactions = yield transaction_model_1.Transaction.find({
      sellerID: user._id,
      status: 'completed',
    });
    // fetch the price of each item in the transactions
    let totalSales = 0;
    for (const transaction of transactions) {
      const item = yield listing_model_1.Listing.findById(transaction.itemID);
      if (item && item.price) {
        totalSales += item.price;
      }
    }
    return totalSales;
  });
exports.getTotalSales = getTotalSales;
exports.AnalyticsServices = {
  getTotalProductsAdded: exports.getTotalProductsAdded,
  getTotalPurchases: exports.getTotalPurchases,
  getTotalSales: exports.getTotalSales,
};
