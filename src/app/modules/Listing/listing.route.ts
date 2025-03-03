import express from 'express';
import { ListingControllers } from './listing.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { validateRequestSchema } from '../../middleware/validateRequestSchema';
import { ListingValidationSchema } from './listing.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(ListingValidationSchema.createListingValidationSchema),
  ListingControllers.createListingController,
);

router.get('/', ListingControllers.getAllListingsController);

router.get(
  '/byUser',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingControllers.getListingsBySpecificUserController,
);

router.get('/:id', ListingControllers.getListingByIdController);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(ListingValidationSchema.updateListingValidationSchema),
  ListingControllers.updateListingByIdController,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingControllers.updateListingStatusByIdController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingControllers.deleteListingByIdController,
);

router.delete(
  '/admin/:id',
  auth(USER_ROLE.admin),
  ListingControllers.deleteListingByAdmin,
);

export const ListingRoutes = router;
