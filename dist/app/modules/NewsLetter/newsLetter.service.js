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
exports.NewsLetterServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const newsLetter_model_1 = require("./newsLetter.model");
const createNewsLetter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdNewsLetter = yield newsLetter_model_1.NewsLetter.create(payload);
    return createdNewsLetter;
});
const getAllNewsLetters = () => __awaiter(void 0, void 0, void 0, function* () {
    const newsLetters = yield newsLetter_model_1.NewsLetter.find();
    if (newsLetters.length === 0) {
        throw new HttpError_1.HttpError(404, 'No newsLetter record were found in the database');
    }
    return newsLetters;
});
exports.NewsLetterServices = {
    createNewsLetter,
    getAllNewsLetters,
};
