import { Document } from 'mongoose';
import { asyncHandler } from '../../../utils/global/asyncHandler';
import { sendResponse } from '../../../utils/global/sendResponse';
import { TransactionServices } from './transaction.service';

const createTransactionController = asyncHandler(async (req, res) => {
  const transactionPayload = req.body;
  const { identifier } = req.user;
  const { createdOrder, paymentUrl } =
    await TransactionServices.createTransaction(transactionPayload, identifier);

  const orderData =
    createdOrder instanceof Document ? createdOrder.toObject() : createdOrder;

  sendResponse(res, {
    success: true,
    message: 'Transaction is created successfully',
    statusCode: 201,
    data: {
      ...orderData,
      paymentUrl,
    },
  });
});

const updateTransactionStatusByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { status } = req.body;
  const updatedStatus = await TransactionServices.updateTransactionStatusById(
    id,
    status,
    identifier,
  );

  sendResponse(res, {
    success: true,
    message: 'Status updated successfully',
    statusCode: 200,
    data: updatedStatus,
  });
});

const getPurchasesHistoryBySpecificUserController = asyncHandler(
  async (req, res) => {
    const { identifier } = req.user;
    const purchasesHistory =
      await TransactionServices.getPurchasesHistoryBySpecificUser(identifier);

    sendResponse(res, {
      success: true,
      message: 'Purchases history are retrieved successfully',
      statusCode: 200,
      data: purchasesHistory,
    });
  },
);

const getSalesHistoryBySpecificUserController = asyncHandler(
  async (req, res) => {
    const { identifier } = req.user;
    const salesHistory =
      await TransactionServices.getSalesHistoryBySpecificUser(identifier);

    sendResponse(res, {
      success: true,
      message: 'Sales history are retrieved successfully',
      statusCode: 200,
      data: salesHistory,
    });
  },
);

export const TransactionControllers = {
  createTransactionController,
  updateTransactionStatusByIdController,
  getPurchasesHistoryBySpecificUserController,
  getSalesHistoryBySpecificUserController,
};
