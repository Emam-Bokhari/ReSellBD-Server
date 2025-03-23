"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const contact_model_1 = require("./contact.model");
const createContact = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdContact = yield contact_model_1.Contact.create(payload);
    return createdContact;
});
const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield contact_model_1.Contact.find();
    if (contacts.length === 0) {
        throw new HttpError_1.HttpError(404, 'No contacts were found in the database');
    }
    return contacts;
});
const getContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findById(id);
    if (!contact) {
        throw new HttpError_1.HttpError(404, 'The requested contact could not be found.');
    }
    return contact;
});
const deleteContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedContact = yield contact_model_1.Contact.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedContact) {
        throw new HttpError_1.HttpError(404, 'The requested contact could not be found.');
    }
    return deletedContact;
});
exports.ContactServices = {
    createContact,
    getAllContacts,
    getContactById,
    deleteContactById,
};
