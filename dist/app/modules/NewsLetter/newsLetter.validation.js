'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.NewsLetterValidationSchema = void 0;
const zod_1 = require('zod');
const createNewsLetterValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z.string().email().trim(),
  }),
});
exports.NewsLetterValidationSchema = {
  createNewsLetterValidationSchema,
};
