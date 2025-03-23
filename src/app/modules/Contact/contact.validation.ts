import { z } from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    services: z.array(z.string()).optional(),
    message: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

export const ContactValidationSchema = {
  createContactValidationSchema,
};
