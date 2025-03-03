import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().max(50, 'User name can not exceed 50 characters'),
    identifier: z.string().trim(),
    password: z.string().trim(),
    role: z.enum(['user', 'admin']).default('user'),
    status: z.enum(['active', 'banned']).default('active'),
    isDeleted: z.boolean().default(false),
    // profile update
    profilePicture: z.string().trim().optional(),
    city: z.string().trim().optional(),
    address: z.string().trim().optional(),
    postalCode: z.string().trim().optional(),
    country: z.string().trim().optional(),
    gender: z.enum(['male', 'female']).optional(),
    bio: z.string().trim().optional(),
    facebook: z.string().trim().optional(),
    website: z.string().trim().url('Invalid website URL').optional(),
  }),
});

export const AuthValidationSchema = {
  registerUserValidationSchema,
};
