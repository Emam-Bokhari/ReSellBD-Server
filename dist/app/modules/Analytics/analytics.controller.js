'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AnalyticsControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const analytics_service_1 = require('./analytics.service');
const getTotalProductsAddedController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { identifier } = req.user;
      const totalProductsAdded =
        yield analytics_service_1.AnalyticsServices.getTotalProductsAdded(
          identifier,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Total products added retrieved successfully',
        statusCode: 200,
        data: totalProductsAdded,
      });
    }),
);
const getTotalPurchasesController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { identifier } = req.user;
      const totalPurchases =
        yield analytics_service_1.AnalyticsServices.getTotalPurchases(
          identifier,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Total purchases retrieved successfully',
        statusCode: 200,
        data: totalPurchases,
      });
    }),
);
const getTotalSalesController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const totalSales =
      yield analytics_service_1.AnalyticsServices.getTotalSales(identifier);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Total sales retrieved successfully',
      statusCode: 200,
      data: totalSales,
    });
  }),
);
const getSalesAnalyticsForCurrentMonthController = (0,
asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const result =
      yield analytics_service_1.AnalyticsServices.getSalesAnalyticsForCurrentMonth(
        identifier,
      );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Total sales in current month data retrieved successfully',
      statusCode: 200,
      data: result,
    });
  }),
);
exports.AnalyticsControllers = {
  getTotalProductsAddedController,
  getTotalPurchasesController,
  getTotalSalesController,
  getSalesAnalyticsForCurrentMonthController,
};
