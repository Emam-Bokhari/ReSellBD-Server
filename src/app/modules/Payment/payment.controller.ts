import { asyncHandler } from '../../utils/global/asyncHandler';

const paymentSuccessController = asyncHandler(async (req, res) => {
  res.redirect(`https://re-sell-bd-client.vercel.app/success`);
});

const paymentFailController = asyncHandler(async (req, res) => {
  res.redirect(`https://re-sell-bd-client.vercel.app/failed`);
});
const paymentCancelController = asyncHandler(async (req, res) => {
  res.redirect(`https://re-sell-bd-client.vercel.app/cancelled`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
