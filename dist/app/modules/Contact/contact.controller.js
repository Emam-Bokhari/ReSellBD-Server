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
exports.ContactControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const contact_service_1 = require('./contact.service');
const createContactController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const contactPayload = req.body;
    const createdContact =
      yield contact_service_1.ContactServices.createContact(contactPayload);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 201,
      message: 'Contact is created successfully',
      data: createdContact,
    });
  }),
);
const getAllContactsController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield contact_service_1.ContactServices.getAllContacts();
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Contacts are retrieved successfully',
      data: contacts,
    });
  }),
);
const getContactController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const contact = yield contact_service_1.ContactServices.getContactById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Contact is retrieved successfully',
      data: contact,
    });
  }),
);
const deleteContactController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield contact_service_1.ContactServices.deleteContactById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Contact is deleted successfully',
      data: {},
    });
  }),
);
exports.ContactControllers = {
  createContactController,
  getAllContactsController,
  getContactController,
  deleteContactController,
};
