'use strict';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require('zod');
const handleZodValidationError_1 = require('../errors/handleZodValidationError');
const config_1 = __importDefault(require('../config'));
const handleValidationError_1 = require('../errors/handleValidationError');
const handleCastError_1 = require('../errors/handleCastError');
const handleDuplicateError_1 = require('../errors/handleDuplicateError');
const HttpError_1 = require('../errors/HttpError');
exports.globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let error = [
    {
      path: '',
      message: '',
    },
  ];
  if (err instanceof zod_1.ZodError) {
    const formattedZodError = (0,
    handleZodValidationError_1.handleZodValidationError)(err);
    statusCode =
      formattedZodError === null || formattedZodError === void 0
        ? void 0
        : formattedZodError.statusCode;
    message =
      formattedZodError === null || formattedZodError === void 0
        ? void 0
        : formattedZodError.message;
    error =
      formattedZodError === null || formattedZodError === void 0
        ? void 0
        : formattedZodError.error;
  } else if (
    (err === null || err === void 0 ? void 0 : err.name) === 'ValidationError'
  ) {
    const formattedValidationError = (0,
    handleValidationError_1.handleValidationError)(err);
    statusCode =
      formattedValidationError === null || formattedValidationError === void 0
        ? void 0
        : formattedValidationError.statusCode;
    message =
      formattedValidationError === null || formattedValidationError === void 0
        ? void 0
        : formattedValidationError.message;
    error =
      formattedValidationError === null || formattedValidationError === void 0
        ? void 0
        : formattedValidationError.error;
  } else if (
    (err === null || err === void 0 ? void 0 : err.name) === 'CastError'
  ) {
    const formattedCastError = (0, handleCastError_1.handleCastError)(err);
    statusCode =
      formattedCastError === null || formattedCastError === void 0
        ? void 0
        : formattedCastError.statusCode;
    message =
      formattedCastError === null || formattedCastError === void 0
        ? void 0
        : formattedCastError.message;
    error =
      formattedCastError === null || formattedCastError === void 0
        ? void 0
        : formattedCastError.error;
  } else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
    const formattedDuplicateError = (0,
    handleDuplicateError_1.handleDuplicateError)(err);
    statusCode =
      formattedDuplicateError === null || formattedDuplicateError === void 0
        ? void 0
        : formattedDuplicateError.statusCode;
    message =
      formattedDuplicateError === null || formattedDuplicateError === void 0
        ? void 0
        : formattedDuplicateError.message;
    error =
      formattedDuplicateError === null || formattedDuplicateError === void 0
        ? void 0
        : formattedDuplicateError.error;
  } else if (err instanceof HttpError_1.HttpError) {
    statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
    message = err === null || err === void 0 ? void 0 : err.message;
    error = [
      {
        path: '',
        message: err === null || err === void 0 ? void 0 : err.message,
      },
    ];
  } else if (err instanceof Error) {
    error = [
      {
        path: '',
        message: err === null || err === void 0 ? void 0 : err.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
    error,
    stack: config_1.default.node_env === 'development' ? err.stack : null,
  });
};
