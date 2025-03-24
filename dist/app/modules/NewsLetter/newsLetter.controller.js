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
Object.defineProperty(exports, '__esModule', { value: true });
exports.NewsLetterControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const newsLetter_service_1 = require('./newsLetter.service');
const createNewsLetterController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const newsLetterPayload = req.body;
      const createdNewsLetter =
        yield newsLetter_service_1.NewsLetterServices.createNewsLetter(
          newsLetterPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'NewsLetter is created successfully',
        statusCode: 201,
        data: createdNewsLetter,
      });
    }),
);
const getAllNewsLettersController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const newsLetters =
        yield newsLetter_service_1.NewsLetterServices.getAllNewsLetters();
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'NewsLetters are retrieved successfully',
        statusCode: 200,
        data: newsLetters,
      });
    }),
);
exports.NewsLetterControllers = {
  createNewsLetterController,
  getAllNewsLettersController,
};
