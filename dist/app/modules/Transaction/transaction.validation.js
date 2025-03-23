"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValidationSchema = void 0;
const zod_1 = require("zod");
const createTransactionValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        buyerID: zod_1.z.string().optional(),
        sellerID: zod_1.z.string().optional(),
        itemID: zod_1.z.string(),
        paymentMethod: zod_1.z.enum(['online']).default('online'),
        transactionId: zod_1.z.string().optional(),
    }),
});
exports.TransactionValidationSchema = {
    createTransactionValidationSchema,
};
