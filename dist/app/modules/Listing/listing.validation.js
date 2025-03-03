"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingValidationSchema = void 0;
const zod_1 = require("zod");
const createListingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim(),
        description: zod_1.z.string().trim(),
        price: zod_1.z.number(),
        condition: zod_1.z.enum(['new', 'likeNew', 'used', 'refurbished']),
        images: zod_1.z.array(zod_1.z.string()),
        userID: zod_1.z.string().optional(),
        status: zod_1.z.enum(['available', 'sold']).default('sold'),
        category: zod_1.z.enum([
            'mobiles',
            'electronics',
            'vehicles',
            'property',
            'home',
            'pets',
            'cloths',
            'sports',
        ]),
        brand: zod_1.z.string().trim().optional(),
        location: zod_1.z.string().trim(),
        negotiable: zod_1.z.boolean().optional(),
        warranty: zod_1.z.enum(['yes', 'no']).optional(),
        contactNumber: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateListingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().optional(),
        description: zod_1.z.string().trim().optional(),
        price: zod_1.z.number().optional(),
        condition: zod_1.z.enum(['new', 'likeNew', 'used', 'refurbished']).optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        userID: zod_1.z.string().optional(),
        status: zod_1.z.enum(['available', 'sold']).default('sold'),
        category: zod_1.z
            .enum([
            'mobiles',
            'electronics',
            'vehicles',
            'property',
            'home',
            'pets',
            'cloths',
            'sports',
        ])
            .optional(),
        brand: zod_1.z.string().trim().optional(),
        location: zod_1.z.string().trim().optional(),
        negotiable: zod_1.z.boolean().optional(),
        warranty: zod_1.z.enum(['yes', 'no']).optional(),
        contactNumber: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.ListingValidationSchema = {
    createListingValidationSchema,
    updateListingValidationSchema,
};
