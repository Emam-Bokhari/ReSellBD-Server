"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidationSchema = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        thumbnail: zod_1.z.string(),
        category: zod_1.z.string().max(50, 'Category must not exceed 50 characters'),
        authorName: zod_1.z
            .string()
            .max(500, 'Author information must not exceed 500 characters'),
        introduction: zod_1.z
            .string()
            .max(500, 'Introduction must not exceed 500 characters'),
        mainContent: zod_1.z.string(),
        tags: zod_1.z.array(zod_1.z.string()).max(10, 'Maximum 10 tags allowed').optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .max(100, 'Title must not exceed 100 characters')
            .optional(),
        thumbnail: zod_1.z.string().optional(),
        category: zod_1.z
            .string()
            .max(50, 'Category must not exceed 50 characters')
            .optional(),
        authorName: zod_1.z
            .string()
            .max(500, 'Author information must not exceed 500 characters')
            .optional(),
        introduction: zod_1.z
            .string()
            .max(500, 'Introduction must not exceed 500 characters')
            .optional(),
        mainContent: zod_1.z
            .string()
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).max(10, 'Maximum 10 tags allowed').optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.BlogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
