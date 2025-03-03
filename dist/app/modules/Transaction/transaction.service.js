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
exports.TransactionServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const HttpError_1 = require("../../errors/HttpError");
const listing_model_1 = require("../Listing/listing.model");
const user_model_1 = require("../User/user.model");
const transaction_utils_1 = require("./transaction.utils");
const transaction_model_1 = require("./transaction.model");
const sslCommerez_service_1 = require("../SSLCommerez/sslCommerez.service");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createTransaction = (payload, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    // check if buyer is exists
    const buyer = yield user_model_1.User.isUserExists(identifier);
    if (!buyer) {
        throw new HttpError_1.HttpError(404, 'Buyer not found with this ID');
    }
    payload.buyerID = buyer._id;
    // check if listing is exists
    const listing = yield listing_model_1.Listing.findOne({ _id: payload.itemID });
    if (!listing) {
        throw new HttpError_1.HttpError(404, 'Item not found with this ID');
    }
    // check if seller is exists
    const seller = yield user_model_1.User.findOne({ _id: listing.userID });
    if (!seller) {
        throw new HttpError_1.HttpError(404, 'Seller not found with this ID');
    }
    payload.sellerID = seller._id;
    const transactionId = (0, transaction_utils_1.generateTransactionId)();
    payload.transactionId = transactionId;
    try {
        const paymentResponse = yield sslCommerez_service_1.SSLCommerzService.initiatePayment({
            total_amount: listing.price,
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-success/${transactionId}`,
            fail_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-fail/${transactionId}`,
            cancel_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-cancel/${transactionId}`,
            shipping_method: 'Courier',
            product_name: 'N/A.',
            product_category: 'N/A',
            product_profile: 'general',
            cus_name: 'N/A',
            cus_email: 'N/A',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'N/A',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        });
        payload.transactionId = transactionId;
        const createdOrder = yield transaction_model_1.Transaction.create(payload);
        // console.log(paymentResponse)
        return {
            createdOrder,
            paymentUrl: paymentResponse,
        };
    }
    catch (err) {
        throw new HttpError_1.HttpError(500, 'Failed to initiate payment.');
    }
});
const updateTransactionStatusById = (id, status, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user is exists
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    const validStatuses = ['pending', 'completed'];
    if (!validStatuses.includes(status)) {
        throw new HttpError_1.HttpError(400, `Invalid status: ${status}`);
    }
    const updatedStatus = yield transaction_model_1.Transaction.findOneAndUpdate({ _id: id }, { status: status }, { new: true, runValidators: true });
    if (!updatedStatus) {
        throw new HttpError_1.HttpError(404, 'No transaction found with ID');
    }
    return updatedStatus;
});
const getPurchasesHistoryBySpecificUser = (identifier, query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    // console.log(user)
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    const purchasesHistoryQuery = new QueryBuilder_1.default(transaction_model_1.Transaction.find({ buyerID: user._id })
        .populate('buyerID', '_id name identifier role')
        .populate('sellerID', '_id name identifier role')
        .populate('itemID'), query)
        .sortBy()
        .paginate();
    const meta = yield purchasesHistoryQuery.countTotal();
    const result = yield purchasesHistoryQuery.modelQuery;
    if (result.length === 0) {
        throw new HttpError_1.HttpError(404, 'No purchases history found for this user');
    }
    return {
        meta,
        result,
    };
});
const getSalesHistoryBySpecificUser = (identifier, query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    // console.log(user)
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    const salesHistoryQuery = new QueryBuilder_1.default(transaction_model_1.Transaction.find({ sellerID: user._id })
        .populate('buyerID', '_id name identifier role')
        .populate('sellerID', '_id name identifier role')
        .populate('itemID'), query)
        .sortBy()
        .paginate();
    const meta = yield salesHistoryQuery.countTotal();
    const result = yield salesHistoryQuery.modelQuery;
    if (result.length === 0) {
        throw new HttpError_1.HttpError(404, 'No sales history found for this user');
    }
    return {
        meta,
        result,
    };
});
exports.TransactionServices = {
    createTransaction,
    updateTransactionStatusById,
    getPurchasesHistoryBySpecificUser,
    getSalesHistoryBySpecificUser,
};
