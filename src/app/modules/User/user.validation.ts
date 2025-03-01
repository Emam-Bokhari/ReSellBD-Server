import { z } from "zod";

const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().trim().max(50, 'User name can not exceed 50 characters').optional(),
        email: z.string().trim().email().optional(),
        phoneNumber: z.string().trim().optional(),
        password: z.string().trim().optional(),
        role: z.enum(['user', 'admin']).default('user').optional(),
        status: z.enum(['active', 'banned']).default('active').optional(),
        isDeleted: z.boolean().default(false).optional(),
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

export const UserValidationSchema = {
    updateUserValidationSchema,
}