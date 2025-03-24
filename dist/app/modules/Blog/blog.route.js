'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require('express'));
const blog_controller_1 = require('./blog.controller');
const validateRequestSchema_1 = require('../../middleware/validateRequestSchema');
const blog_validation_1 = require('./blog.validation');
const auth_1 = require('../../middleware/auth');
const user_constant_1 = require('../User/user.constant');
const router = express_1.default.Router();
router.post(
  '/',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  (0, validateRequestSchema_1.validateRequestSchema)(
    blog_validation_1.BlogValidationSchema.createBlogValidationSchema,
  ),
  blog_controller_1.BlogControllers.createBlogController,
);
router.get('/', blog_controller_1.BlogControllers.getAllBlogsController);
router.get('/:id', blog_controller_1.BlogControllers.getBlogController);
router.patch(
  '/:id',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  (0, validateRequestSchema_1.validateRequestSchema)(
    blog_validation_1.BlogValidationSchema.updateBlogValidationSchema,
  ),
  blog_controller_1.BlogControllers.updateBlogController,
);
router.delete(
  '/:id',
  (0, auth_1.auth)(user_constant_1.USER_ROLE.admin),
  blog_controller_1.BlogControllers.deleteBlogController,
);
exports.BlogRoutes = router;
