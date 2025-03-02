/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from "../../errors/HttpError";
import { Listing } from "../Listing/listing.model";
import { User } from "../User/user.model";
import { TTransaction } from "./transaction.interface";
import { generateTransactionId } from "./transaction.utils";
import { Transaction } from "./transaction.model";
import { SSLCommerzService } from "../SSLCommerez/sslCommerez.service";

const createTransaction = async (payload: TTransaction, identifier: string) => {
    // check if buyer is exists
    const buyer = await User.isUserExists(identifier)
    if (!buyer) {
        throw new HttpError(404, "Buyer not found with this ID")
    }
    payload.buyerID = buyer._id;

    // check if listing is exists
    const listing = await Listing.findOne({ _id: payload.itemID })
    if (!listing) {
        throw new HttpError(404, "Item not found with this ID")
    }

    // check if seller is exists
    const seller = await User.findOne({ _id: listing.userID });
    if (!seller) {
        throw new HttpError(404, "Seller not found with this ID")
    }

    payload.sellerID = seller._id;


    const transactionId = generateTransactionId()

    payload.transactionId = transactionId;

    try {
        const paymentResponse = await SSLCommerzService.initiatePayment({
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

        const createdOrder = await Transaction.create(payload)
        // console.log(paymentResponse)

        return {
            createdOrder,
            paymentUrl: paymentResponse,
        };
    } catch (err: any) {
        throw new HttpError(500, 'Failed to initiate payment.');
    }
}

const updateTransactionStatusById = async (id: string, status: string, identifier: string) => {

    // check if user is exists
    const user = await User.isUserExists(identifier)
    if (!user) {
        throw new HttpError(404, "User not found")
    }

    const validStatuses = ['pending', "completed"];

    if (!validStatuses.includes(status)) {
        throw new HttpError(400, `Invalid status: ${status}`);
    }

    const updatedStatus = await Transaction.findOneAndUpdate(
        { _id: id },
        { status: status },
        { new: true, runValidators: true },
    );

    if (!updatedStatus) {
        throw new HttpError(404, 'No transaction found with ID');
    }

    return updatedStatus;

}

const getPurchasesHistoryBySpecificUser = async (identifier: string) => {
    const user = await User.isUserExists(identifier);
    // console.log(user)
    if (!user) {
        throw new HttpError(404, "User not found")
    }

    const purchasesHistory = await Transaction.find({ buyerID: user._id }).populate("buyerID", "_id name identifier role").populate("sellerID", "_id name identifier role").populate("itemID");
    // console.log(purchasesHistory)

    if (purchasesHistory.length === 0) {
        throw new HttpError(404, "No purchases history found for this user");
    }

    return purchasesHistory;

}

const getSalesHistoryBySpecificUser = async (identifier: string) => {
    const user = await User.isUserExists(identifier);
    // console.log(user)
    if (!user) {
        throw new HttpError(404, "User not found")
    }

    const salesHistory = await Transaction.find({ sellerID: user._id }).populate("buyerID", "_id name identifier role").populate("sellerID", "_id name identifier role").populate("itemID");;
    // console.log(salesHistory)

    if (salesHistory.length === 0) {
        throw new HttpError(404, "No sales history found for this user");
    }

    return salesHistory;

}

export const TransactionServices = {
    createTransaction,
    updateTransactionStatusById,
    getPurchasesHistoryBySpecificUser,
    getSalesHistoryBySpecificUser,
}