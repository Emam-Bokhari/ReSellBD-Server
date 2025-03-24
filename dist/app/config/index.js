'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
  port: process.env.PORT,
  node_env: process.env.NODE,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  ssl: {
    store_name: process.env.STORE_NAME,
    payment_api: process.env.PAYMENT_API,
    validation_api: process.env.VALIDATION_API,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASSWORD,
    validation_url: process.env.VALIDATION_URL,
    success_url: process.env.SUCCESS_URL,
    failed_url: process.env.FAILED_URL,
    cancel_url: process.env.CANCEL_URL,
  },
};
