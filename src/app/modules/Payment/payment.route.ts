import express from 'express';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post(
  '/payment-success/:transactionId',
  PaymentControllers.paymentSuccessController,
);

router.post(
  '/payment-fail/:transactionId',
  PaymentControllers.paymentFailController,
);

router.post(
  '/payment-cancel/:transactionId',
  PaymentControllers.paymentCancelController,
);

export const PaymentRoutes = router;
