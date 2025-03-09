'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require('zod');
const updateUserValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z
      .string()
      .trim()
      .max(50, 'User name can not exceed 50 characters')
      .optional(),
    identifier: zod_1.z.string().optional(),
    password: zod_1.z.string().trim().optional(),
    role: zod_1.z.enum(['user', 'admin']).default('user').optional(),
    status: zod_1.z.enum(['active', 'banned']).default('active').optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
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
exports.UserValidationSchema = {
  updateUserValidationSchema,
};
