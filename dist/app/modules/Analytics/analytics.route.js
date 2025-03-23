'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = __importDefault(require('express'));
const analytics_controller_1 = require('./analytics.controller');
const auth_1 = require('../../middleware/auth');
const user_constant_1 = require('../User/user.constant');
const router = express_1.default.Router();
router.get(
  '/total-products',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  analytics_controller_1.AnalyticsControllers.getTotalProductsAddedController,
);
router.get(
  '/total-purchases',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  analytics_controller_1.AnalyticsControllers.getTotalPurchasesController,
);
router.get(
  '/total-sales',
  (0, auth_1.auth)(
    user_constant_1.USER_ROLE.user,
    user_constant_1.USER_ROLE.admin,
  ),
  analytics_controller_1.AnalyticsControllers.getTotalSalesController,
);
exports.AnalyticsRoutes = router;
