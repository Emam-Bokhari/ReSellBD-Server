import { z } from 'zod';

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        thumbnail: z.string(),
        category: z
            .string()
            .max(50, 'Category must not exceed 50 characters'),
        authorName: z
            .string()
            .max(500, 'Author information must not exceed 500 characters'),
        introduction: z
            .string()

            .max(500, 'Introduction must not exceed 500 characters'),
        mainContent: z.string(),

        tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
        isDeleted: z.boolean().default(false),
    }),
});

const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z
            .string()

            .max(100, 'Title must not exceed 100 characters')
            .optional(),
        thumbnail: z.string().optional(),
        category: z
            .string()

            .max(50, 'Category must not exceed 50 characters')
            .optional(),
        authorName: z
            .string()

            .max(500, 'Author information must not exceed 500 characters')
            .optional(),
        introduction: z
            .string()

            .max(500, 'Introduction must not exceed 500 characters')
            .optional(),
        mainContent: z
            .string()

            .optional(),
        tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
        isDeleted: z.boolean().default(false),
    }),
});

export const BlogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};