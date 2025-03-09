import { asyncHandler } from '../../utils/global/asyncHandler';

const paymentSuccessController = asyncHandler(async (req, res) => {
  res.redirect(`http://localhost:3000/success`);
});

const paymentFailController = asyncHandler(async (req, res) => {
  res.redirect(`http://localhost:3000/failed`);
});
const paymentCancelController = asyncHandler(async (req, res) => {
  res.redirect(`http://localhost:3000/cancelled`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
