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
exports.TransactionControllers = void 0;
const mongoose_1 = require('mongoose');
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const transaction_service_1 = require('./transaction.service');
const createTransactionController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const transactionPayload = req.body;
      const { identifier } = req.user;
      const { createdOrder, paymentUrl } =
        yield transaction_service_1.TransactionServices.createTransaction(
          transactionPayload,
          identifier,
        );
      const orderData =
        createdOrder instanceof mongoose_1.Document
          ? createdOrder.toObject()
          : createdOrder;
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Transaction is created successfully',
        statusCode: 201,
        data: Object.assign(Object.assign({}, orderData), { paymentUrl }),
      });
    }),
);
const updateTransactionStatusByIdController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const { identifier } = req.user;
      const { status } = req.body;
      const updatedStatus =
        yield transaction_service_1.TransactionServices.updateTransactionStatusById(
          id,
          status,
          identifier,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Status updated successfully',
        statusCode: 200,
        data: updatedStatus,
      });
    }),
);
const getPurchasesHistoryBySpecificUserController = (0,
asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const query = req.query;
    const purchasesHistory =
      yield transaction_service_1.TransactionServices.getPurchasesHistoryBySpecificUser(
        identifier,
        query,
      );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Purchases history are retrieved successfully',
      statusCode: 200,
      data: purchasesHistory,
    });
  }),
);
const getSalesHistoryBySpecificUserController = (0,
asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const query = req.query;
    const salesHistory =
      yield transaction_service_1.TransactionServices.getSalesHistoryBySpecificUser(
        identifier,
        query,
      );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Sales history are retrieved successfully',
      statusCode: 200,
      data: salesHistory,
    });
  }),
);
exports.TransactionControllers = {
  createTransactionController,
  updateTransactionStatusByIdController,
  getPurchasesHistoryBySpecificUserController,
  getSalesHistoryBySpecificUserController,
};
