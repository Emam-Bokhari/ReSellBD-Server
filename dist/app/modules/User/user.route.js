'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_controller_1 = require('./user.controller');
const auth_1 = require('../../middleware/auth');
const user_constant_1 = require('./user.constant');
const router = express_1.default.Router();
router.get('/', user_controller_1.UserControllers.getAllUsersController);
router.get('/:id', user_controller_1.UserControllers.getUserControllerById);
router.patch(
  '/:id',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  user_controller_1.UserControllers.updateUserControllerById,
);
router.patch(
  '/:id/status',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  user_controller_1.UserControllers.updateUserStatusByIdController,
);
router.delete(
  '/:id',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  user_controller_1.UserControllers.deleteUserControllerById,
);
exports.UserRoutes = router;
