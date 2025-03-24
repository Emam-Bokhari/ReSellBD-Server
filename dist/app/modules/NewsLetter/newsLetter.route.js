'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.NewsLetterRoutes = void 0;
const express_1 = __importDefault(require('express'));
const newsLetter_controller_1 = require('./newsLetter.controller');
const validateRequestSchema_1 = require('../../middleware/validateRequestSchema');
const newsLetter_validation_1 = require('./newsLetter.validation');
const auth_1 = require('../../middleware/auth');
const user_constant_1 = require('../User/user.constant');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    newsLetter_validation_1.NewsLetterValidationSchema
      .createNewsLetterValidationSchema,
  ),
  newsLetter_controller_1.NewsLetterControllers.createNewsLetterController,
);
router.get(
  '/',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  newsLetter_controller_1.NewsLetterControllers.getAllNewsLettersController,
);
exports.NewsLetterRoutes = router;
