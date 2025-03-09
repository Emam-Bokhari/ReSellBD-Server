import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', UserControllers.getAllUsersController);

router.get("/me", auth(USER_ROLE.user, USER_ROLE.admin), UserControllers.getMeController)

router.get('/:id', UserControllers.getUserControllerById);


router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.updateUserControllerById,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.admin),
  UserControllers.updateUserStatusByIdController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.deleteUserControllerById,
);

export const UserRoutes = router;
