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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ListingServices = void 0;
const QueryBuilder_1 = __importDefault(require('../../builder/QueryBuilder'));
const HttpError_1 = require('../../errors/HttpError');
const user_model_1 = require('../User/user.model');
const listing_model_1 = require('./listing.model');
const listing_utils_1 = require('./listing.utils');
const createListing = (payload, identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ identifier: identifier });
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    payload.userID = user === null || user === void 0 ? void 0 : user._id;
    const createdListing = yield listing_model_1.Listing.create(payload);
    return createdListing;
  });
const getAllListings = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const listingQuery = new QueryBuilder_1.default(
      listing_model_1.Listing.find().populate(
        'userID',
        '_id name identifier role',
      ),
      query,
    )
      .search(listing_utils_1.searchableFields)
      .filter()
      .sortBy()
      .paginate();
    const meta = yield listingQuery.countTotal();
    const result = yield listingQuery.modelQuery;
    if (result.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No listing record were found in the database',
      );
    }
    return {
      meta,
      result,
    };
  });
const getListingsBySpecificUser = (identifier, query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    const listingQuery = new QueryBuilder_1.default(
      listing_model_1.Listing.find({ userID: user._id }).populate(
        'userID',
        '_id name identifier role',
      ),
      query,
    )
      .filter()
      .sortBy()
      .paginate();
    const meta = yield listingQuery.countTotal();
    const result = yield listingQuery.modelQuery;
    if (result.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No listing were found provide this user ID',
      );
    }
    return {
      meta,
      result,
    };
  });
const getListingById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_model_1.Listing.findById(id).populate(
      'userID',
      '_id name identifier role',
    );
    if (!listing) {
      throw new HttpError_1.HttpError(404, 'No listing found with ID');
    }
    return listing;
  });
const updateListingById = (id, payload, identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if user is exists
    const userExists = yield user_model_1.User.isUserExists(identifier);
    if (!userExists) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    const user = yield user_model_1.User.findOne({ identifier: identifier });
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    const listing = yield listing_model_1.Listing.findOne({
      _id: id,
      userID: user._id,
    });
    if (!listing) {
      throw new HttpError_1.HttpError(
        403,
        'You are not allowed to update this listing',
      );
    }
    const updatedListing = yield listing_model_1.Listing.findOneAndUpdate(
      { _id: id, isDeleted: false },
      payload,
      { new: true, runValidators: true },
    );
    if (!updatedListing) {
      throw new HttpError_1.HttpError(404, 'No listing found with ID');
    }
    return updatedListing;
  });
const updateListingStatusById = (id, status, identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) throw new HttpError_1.HttpError(404, 'User not found');
    // update listing status
    const updatedListingStatus = yield listing_model_1.Listing.findOneAndUpdate(
      { _id: id, userID: user._id },
      { status },
      { runValidators: true, new: true },
    );
    if (!updatedListingStatus)
      throw new HttpError_1.HttpError(
        403,
        'You are not allowed to update this listing status',
      );
    return updatedListingStatus;
  });
const deleteListingById = (id, identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if user is exists
    const userExists = yield user_model_1.User.isUserExists(identifier);
    if (!userExists) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    // find the user by identifier
    const user = yield user_model_1.User.findOne({ identifier: identifier });
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    // find the listing by its id and check if it belongs to the user
    const listing = yield listing_model_1.Listing.findOne({
      _id: id,
      userID: user._id,
    });
    if (!listing) {
      throw new HttpError_1.HttpError(
        403,
        'You are not allowed to delete this listing',
      );
    }
    const deletedListing = yield listing_model_1.Listing.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
    return deletedListing;
  });
const deleteListingByAdmin = (id, identifier) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
      throw new HttpError_1.HttpError(404, 'User not found');
    }
    // Check if the user is an admin
    if (user.role !== 'admin') {
      throw new HttpError_1.HttpError(
        403,
        'You are not authorized to perform this action',
      );
    }
    const deletedListing = yield listing_model_1.Listing.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedListing) {
      throw new HttpError_1.HttpError(
        404,
        'No listing were found in the database',
      );
    }
    return deletedListing;
  });
exports.ListingServices = {
  createListing,
  getAllListings,
  getListingsBySpecificUser,
  getListingById,
  updateListingStatusById,
  updateListingById,
  deleteListingById,
  deleteListingByAdmin,
};
