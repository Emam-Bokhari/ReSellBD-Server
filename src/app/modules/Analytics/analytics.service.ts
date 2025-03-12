import { HttpError } from '../../errors/HttpError';
import { Listing } from '../Listing/listing.model';
import { Transaction } from '../Transaction/transaction.model';
import { User } from '../User/user.model';

export const getTotalProductsAdded = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return Listing.countDocuments({ userID: user._id, isDeleted: false });
};

export const getTotalPurchases = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return Transaction.countDocuments({ buyerID: user._id, status: 'completed' });
};

export const getTotalSales = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  // find all transactions where the seller matches the user's ID and the status is 'completed'
  const transactions = await Transaction.find({
    sellerID: user._id,
    status: 'completed',
  });

  // fetch the price of each item in the transactions
  let totalSales = 0;
  for (const transaction of transactions) {
    const item = await Listing.findById(transaction.itemID);
    if (item && item.price) {
      totalSales += item.price;
    }
  }

  return totalSales;
};

export const AnalyticsServices = {
  getTotalProductsAdded,
  getTotalPurchases,
  getTotalSales,
};
