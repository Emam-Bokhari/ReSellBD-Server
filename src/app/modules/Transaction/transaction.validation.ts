import { z } from 'zod';

const createTransactionValidationSchema = z.object({
  body: z.object({
    buyerID: z.string().optional(),
    sellerID: z.string().optional(),
    itemID: z.string(),
    paymentMethod: z.enum(['online']).default('online'),
    transactionId: z.string().optional(),
  }),
});

export const TransactionValidationSchema = {
  createTransactionValidationSchema,
};
