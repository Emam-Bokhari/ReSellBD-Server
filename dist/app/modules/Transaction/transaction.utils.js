'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateTransactionId = void 0;
const crypto_1 = __importDefault(require('crypto'));
const generateTransactionId = () => {
  const prefix = 'TXN';
  const timestamp = Date.now();
  const randomId = crypto_1.default.randomBytes(4).toString('hex');
  return `${prefix}-${timestamp}-${randomId}`;
};
exports.generateTransactionId = generateTransactionId;
