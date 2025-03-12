import { HttpError } from "../../errors/HttpError";
import { Listing } from "../Listing/listing.model";
import { Transaction } from "../Transaction/transaction.model";
import { User } from "../User/user.model";

export const getTotalProductsAdded = async (identifier: string) => {
    const user = await User.isUserExists(identifier);
    if (!user) {
        throw new HttpError(404, "User not found");
    }

    return Listing.countDocuments({ userID: user._id, isDeleted: false });
};

export const getTotalPurchases = async (identifier: string) => {
    const user = await User.isUserExists(identifier);
    if (!user) {
        throw new HttpError(404, "User not found");
    }

    return Transaction.countDocuments({ buyerID: user._id });
};

export const getTotalSales = async (identifier: string) => {
    const user = await User.isUserExists(identifier);
    if (!user) {
        throw new HttpError(404, "User not found");
    }

    return Transaction.countDocuments({ sellerID: user._id });
};

export const AnalyticsServices = {
    getTotalProductsAdded,
    getTotalPurchases,
    getTotalSales,
}