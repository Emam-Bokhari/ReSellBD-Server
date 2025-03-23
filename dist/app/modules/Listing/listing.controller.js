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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const listing_service_1 = require("./listing.service");
const createListingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listingPayload = req.body;
    const { identifier } = req.user;
    const createdListing = yield listing_service_1.ListingServices.createListing(listingPayload, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing is created successfully',
        statusCode: 201,
        data: createdListing,
    });
}));
const getAllListingsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield listing_service_1.ListingServices.getAllListings();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listings are retrieved successfully',
        statusCode: 200,
        data: listings,
    });
}));
const getListingsByCategoryController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const listings = yield listing_service_1.ListingServices.getListingsByCategory(category);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Category wise listings are retrieved successfully',
        statusCode: 200,
        data: listings,
    });
}));
const getListingsBySpecificUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const listings = yield listing_service_1.ListingServices.getListingsBySpecificUser(identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Specific user wise listings are retrieved successfully',
        statusCode: 200,
        data: listings,
    });
}));
const getListingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const listing = yield listing_service_1.ListingServices.getListingById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing is retrieved successfully',
        statusCode: 200,
        data: listing,
    });
}));
const updateListingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const { identifier } = req.user;
    const updatedListing = yield listing_service_1.ListingServices.updateListingById(id, updatedPayload, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing is updated successfully',
        statusCode: 200,
        data: updatedListing,
    });
}));
const updateListingStatusByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const { status } = req.body;
    const updatedListingStatus = yield listing_service_1.ListingServices.updateListingStatusById(id, status, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Update listing status successfully',
        statusCode: 200,
        data: updatedListingStatus,
    });
}));
const deleteListingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const deletedListing = yield listing_service_1.ListingServices.deleteListingById(id, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing is deleted successfully',
        statusCode: 200,
        data: deletedListing,
    });
}));
const deleteListingByAdmin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    yield listing_service_1.ListingServices.deleteListingByAdmin(id, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.ListingControllers = {
    createListingController,
    getAllListingsController,
    getListingsByCategoryController,
    getListingsBySpecificUserController,
    getListingByIdController,
    updateListingByIdController,
    updateListingStatusByIdController,
    deleteListingByIdController,
    deleteListingByAdmin,
};
