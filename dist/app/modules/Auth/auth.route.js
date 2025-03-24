'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequestSchema_1 = require('../../middleware/validateRequestSchema');
const auth_validation_1 = require('./auth.validation');
const auth_controller_1 = require('./auth.controller');
const router = express_1.default.Router();
router.post(
  '/register',
  (0, validateRequestSchema_1.validateRequestSchema)(
    auth_validation_1.AuthValidationSchema.registerUserValidationSchema,
  ),
  auth_controller_1.AuthControllers.registerUserController,
);
router.post('/login', auth_controller_1.AuthControllers.loginUserController);
exports.AuthRoutes = router;
