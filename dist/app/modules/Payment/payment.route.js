'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const payment_controller_1 = require('./payment.controller');
const router = express_1.default.Router();
router.post(
  '/payment-success/:transactionId',
  payment_controller_1.PaymentControllers.paymentSuccessController,
);
router.post(
  '/payment-fail/:transactionId',
  payment_controller_1.PaymentControllers.paymentFailController,
);
router.post(
  '/payment-cancel/:transactionId',
  payment_controller_1.PaymentControllers.paymentCancelController,
);
exports.PaymentRoutes = router;
