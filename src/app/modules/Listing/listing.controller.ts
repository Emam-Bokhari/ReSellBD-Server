import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { ListingServices } from './listing.service';

const createListingController = asyncHandler(async (req, res) => {
  const listingPayload = req.body;
  const { identifier } = req.user;
  const createdListing = await ListingServices.createListing(
    listingPayload,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'Listing is created successfully',
    statusCode: 201,
    data: createdListing,
  });
});

const getAllListingsController = asyncHandler(async (req, res) => {
  const query = req.query;

  const result = await ListingServices.getAllListings(query);
  sendResponse(res, {
    success: true,
    message: 'Listings are retrieved successfully',
    statusCode: 200,
    meta: result.meta,
    data: result.result,
  });
});

const getListingsBySpecificUserController = asyncHandler(async (req, res) => {
  const query = req.query;
  const { identifier } = req.user;
  const listings = await ListingServices.getListingsBySpecificUser(
    identifier,
    query,
  );

  sendResponse(res, {
    success: true,
    message: 'Listings are retrieved successfully',
    statusCode: 200,
    data: listings,
  });
});

const getListingByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const listing = await ListingServices.getListingById(id);
  sendResponse(res, {
    success: true,
    message: 'Listing is retrieved successfully',
    statusCode: 200,
    data: listing,
  });
});

const updateListingByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedPayload = req.body;
  const { identifier } = req.user;
  const updatedListing = await ListingServices.updateListingById(
    id,
    updatedPayload,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'Listing is updated successfully',
    statusCode: 200,
    data: updatedListing,
  });
});

const updateListingStatusByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { status } = req.body;
  const updatedListingStatus = await ListingServices.updateListingStatusById(
    id,
    status,
    identifier,
  );

  sendResponse(res, {
    success: true,
    message: 'Update listing status successfully',
    statusCode: 200,
    data: updatedListingStatus,
  });
});

const deleteListingByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const deletedListing = await ListingServices.deleteListingById(
    id,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'Listing is deleted successfully',
    statusCode: 200,
    data: deletedListing,
  });
});

const deleteListingByAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  await ListingServices.deleteListingByAdmin(id, identifier);
  sendResponse(res, {
    success: true,
    message: 'Listing deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const ListingControllers = {
  createListingController,
  getAllListingsController,
  getListingsBySpecificUserController,
  getListingByIdController,
  updateListingByIdController,
  updateListingStatusByIdController,
  deleteListingByIdController,
  deleteListingByAdmin,
};
