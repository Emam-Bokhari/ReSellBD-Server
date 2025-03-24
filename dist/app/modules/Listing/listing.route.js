'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ListingRoutes = void 0;
const express_1 = __importDefault(require('express'));
const listing_controller_1 = require('./listing.controller');
const auth_1 = require('../../middleware/auth');
const user_constant_1 = require('../User/user.constant');
const validateRequestSchema_1 = require('../../middleware/validateRequestSchema');
const listing_validation_1 = require('./listing.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  (0, validateRequestSchema_1.validateRequestSchema)(
    listing_validation_1.ListingValidationSchema.createListingValidationSchema,
  ),
  listing_controller_1.ListingControllers.createListingController,
);
router.get(
  '/',
  listing_controller_1.ListingControllers.getAllListingsController,
);
router.get(
  '/category/:category',
  listing_controller_1.ListingControllers.getListingsByCategoryController,
);
router.get(
  '/byUser',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  listing_controller_1.ListingControllers.getListingsBySpecificUserController,
);
router.get(
  '/:id',
  listing_controller_1.ListingControllers.getListingByIdController,
);
router.patch(
  '/:id',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  (0, validateRequestSchema_1.validateRequestSchema)(
    listing_validation_1.ListingValidationSchema.updateListingValidationSchema,
  ),
  listing_controller_1.ListingControllers.updateListingByIdController,
);
router.patch(
  '/:id/status',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  listing_controller_1.ListingControllers.updateListingStatusByIdController,
);
router.delete(
  '/:id',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  listing_controller_1.ListingControllers.deleteListingByIdController,
);
router.delete(
  '/admin/:id',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  listing_controller_1.ListingControllers.deleteListingByAdmin,
);
exports.ListingRoutes = router;
