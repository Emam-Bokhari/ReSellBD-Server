'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
  constructor(statusCode, message, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
exports.HttpError = HttpError;
