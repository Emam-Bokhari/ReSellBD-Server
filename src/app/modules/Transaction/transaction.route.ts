import express from 'express';
import { TransactionControllers } from './transaction.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.createTransactionController,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.updateTransactionStatusByIdController,
);

router.get(
  '/purchases-history',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getPurchasesHistoryBySpecificUserController,
);

router.get(
  '/sales-history',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getSalesHistoryBySpecificUserController,
);

export const TransactionRoutes = router;
