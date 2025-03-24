'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require('express'));
const contact_controller_1 = require('./contact.controller');
const validateRequestSchema_1 = require('../../middleware/validateRequestSchema');
const contact_validation_1 = require('./contact.validation');
const auth_1 = require('../../middleware/auth');
const user_constant_1 = require('../User/user.constant');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    contact_validation_1.ContactValidationSchema.createContactValidationSchema,
  ),
  contact_controller_1.ContactControllers.createContactController,
);
router.get(
  '/',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  contact_controller_1.ContactControllers.getAllContactsController,
);
router.get(
  '/:id',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  contact_controller_1.ContactControllers.getContactController,
);
router.delete(
  '/:id',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  contact_controller_1.ContactControllers.deleteContactController,
);
exports.ContactRoutes = router;
