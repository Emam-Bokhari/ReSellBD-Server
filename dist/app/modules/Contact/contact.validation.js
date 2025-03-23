"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidationSchema = void 0;
const zod_1 = require("zod");
const createContactValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        email: zod_1.z.string().email('Invalid email format'),
        phone: zod_1.z.string().optional(),
        services: zod_1.z.array(zod_1.z.string()).optional(),
        message: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.ContactValidationSchema = {
    createContactValidationSchema,
};
