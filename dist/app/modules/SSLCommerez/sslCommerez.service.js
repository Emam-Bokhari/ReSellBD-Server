'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SSLCommerzService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const config_1 = __importDefault(require('../../config'));
const sslcommerz_lts_1 = __importDefault(require('sslcommerz-lts'));
const HttpError_1 = require('../../errors/HttpError');
const store_id = config_1.default.ssl.store_id;
const store_pass = config_1.default.ssl.store_pass;
const is_live = false; // true for live false for sandbox
const initiatePayment = (paymentData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const sslcz = new sslcommerz_lts_1.default(store_id, store_pass, is_live);
    try {
      const apiResponse = yield sslcz.init(Object.assign({}, paymentData));
      return apiResponse.GatewayPageURL;
    } catch (error) {
      throw new HttpError_1.HttpError(400, 'Failed to initiate payment');
    }
  });
exports.SSLCommerzService = {
  initiatePayment,
};
