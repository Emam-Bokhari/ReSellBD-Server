import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsersController);

router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getMeController,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin),
  UserControllers.getUserControllerById,
);

router.patch(
  '/update-profile',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.updateUserController,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.admin),
  UserControllers.updateUserStatusByIdController,
);

router.patch(
  '/:id/role',
  auth(USER_ROLE.admin),
  UserControllers.updateUserRoleByIdController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  UserControllers.deleteUserControllerById,
);

export const UserRoutes = router;
