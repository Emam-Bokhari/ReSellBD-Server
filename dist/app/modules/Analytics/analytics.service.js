"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsServices = exports.getTotalSales = exports.getTotalPurchases = exports.getTotalProductsAdded = void 0;
const moment_1 = __importDefault(require("moment"));
const HttpError_1 = require("../../errors/HttpError");
const listing_model_1 = require("../Listing/listing.model");
const transaction_model_1 = require("../Transaction/transaction.model");
const user_model_1 = require("../User/user.model");
const getTotalProductsAdded = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    return listing_model_1.Listing.countDocuments({ userID: user._id, isDeleted: false });
});
exports.getTotalProductsAdded = getTotalProductsAdded;
const getTotalPurchases = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    return transaction_model_1.Transaction.countDocuments({ buyerID: user._id, status: 'completed' });
});
exports.getTotalPurchases = getTotalPurchases;
const getTotalSales = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
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
const getSalesAnalyticsForCurrentMonth = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    // get the start and end date of the current month dynamically
    const startOfMonth = (0, moment_1.default)().startOf('month').toDate();
    const endOfMonth = (0, moment_1.default)().endOf('month').toDate();
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user)
        throw new HttpError_1.HttpError(404, 'User not found');
    const result = yield transaction_model_1.Transaction.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfMonth,
                    $lt: endOfMonth,
                },
                status: 'completed',
                sellerID: user._id,
            },
        },
        {
            $lookup: {
                from: 'listings',
                localField: 'itemID',
                foreignField: '_id',
                as: 'listingDetails',
            },
        },
        {
            $unwind: '$listingDetails',
        },
        {
            $project: {
                day: { $dayOfMonth: '$createdAt' },
                price: '$listingDetails.price',
            },
        },
        {
            $group: {
                _id: '$day',
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: '$price' },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);
    // create an array with all days of the current month, even if they have no sales
    const daysInMonth = (0, moment_1.default)().daysInMonth();
    const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    // create an object for each day of the month, filling missing days with 0 sales and revenue
    const formattedResult = allDays.map((day) => {
        const dayData = result.find((item) => item._id === day);
        return {
            date: `${(0, moment_1.default)().format('MMMM')} ${day}`,
            totalSales: dayData ? dayData.totalSales : 0,
            totalRevenue: dayData ? dayData.totalRevenue : 0,
        };
    });
    return formattedResult;
});
exports.AnalyticsServices = {
    getTotalProductsAdded: exports.getTotalProductsAdded,
    getTotalPurchases: exports.getTotalPurchases,
    getTotalSales: exports.getTotalSales,
    getSalesAnalyticsForCurrentMonth,
};
