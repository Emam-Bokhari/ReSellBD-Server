import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { AnalyticsServices } from './analytics.service';

const getTotalProductsAddedController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const totalProductsAdded =
    await AnalyticsServices.getTotalProductsAdded(identifier);
  sendResponse(res, {
    success: true,
    message: 'Total products added retrieved successfully',
    statusCode: 200,
    data: totalProductsAdded,
  });
});
const getTotalPurchasesController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const totalPurchases = await AnalyticsServices.getTotalPurchases(identifier);
  sendResponse(res, {
    success: true,
    message: 'Total purchases retrieved successfully',
    statusCode: 200,
    data: totalPurchases,
  });
});

const getTotalSalesController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const totalSales = await AnalyticsServices.getTotalSales(identifier);
  sendResponse(res, {
    success: true,
    message: 'Total sales retrieved successfully',
    statusCode: 200,
    data: totalSales,
  });
});

export const AnalyticsControllers = {
  getTotalProductsAddedController,
  getTotalPurchasesController,
  getTotalSalesController,
};
