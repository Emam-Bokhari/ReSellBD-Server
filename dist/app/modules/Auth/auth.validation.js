"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchema = void 0;
const zod_1 = require("zod");
const registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().max(50, 'User name can not exceed 50 characters'),
        identifier: zod_1.z.string().trim(),
        password: zod_1.z.string().trim(),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
        status: zod_1.z.enum(['active', 'banned']).default('active'),
        isDeleted: zod_1.z.boolean().default(false),
        // profile update
        profilePicture: zod_1.z.string().trim().optional(),
        city: zod_1.z.string().trim().optional(),
        address: zod_1.z.string().trim().optional(),
        postalCode: zod_1.z.string().trim().optional(),
        country: zod_1.z.string().trim().optional(),
        gender: zod_1.z.enum(['male', 'female']).optional(),
        bio: zod_1.z.string().trim().optional(),
        facebook: zod_1.z.string().trim().optional(),
        website: zod_1.z.string().trim().url('Invalid website URL').optional(),
    }),
});
exports.AuthValidationSchema = {
    registerUserValidationSchema,
};
