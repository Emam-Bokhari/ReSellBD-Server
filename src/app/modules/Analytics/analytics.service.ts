import { HttpError } from "../../errors/HttpError";
import { Listing } from "../Listing/listing.model";
import { User } from "../User/user.model";

export const getTotalProductsAdded = async (identifier: string) => {
    const user = await User.isUserExists(identifier);
    if (!user) {
        throw new HttpError(404, "User not found");
    }

    return Listing.countDocuments({ userID: user._id, isDeleted: false });
};


// export const getTotalPurchases = async (userId) => {
//     return await Transaction.countDocuments({ buyerID: userId, status: 'completed' });
// };

// export const getTotalSales = async (userId) => {
//     return await Transaction.countDocuments({ sellerID: userId, status: 'completed' });
// };

export const AnalyticsServices = {
    getTotalProductsAdded,
}