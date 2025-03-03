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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const HttpError_1 = require("../../errors/HttpError");
const user_model_1 = require("../User/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user is exists
    const existingUser = yield user_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.identifier);
    if (existingUser) {
        throw new HttpError_1.HttpError(400, `A user with the identifier '${payload === null || payload === void 0 ? void 0 : payload.identifier}' already exists. Please use a different email or phone number.`);
    }
    const registeredUser = yield user_model_1.User.create(payload);
    return registeredUser;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if either email or phoneNumber is not provided, throw an error
    if (!payload.identifier) {
        throw new HttpError_1.HttpError(400, 'Email or phone number must be provided');
    }
    // use the identifier (email or phone number) to check if the user exists
    const user = yield user_model_1.User.isUserExists(payload.identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    // check if user is already deleted
    if (user.isDeleted) {
        throw new HttpError_1.HttpError(404, 'The user is already deleted');
    }
    // check if user is already banned
    if (user.status === 'banned') {
        throw new HttpError_1.HttpError(403, 'The user account is banned.');
    }
    // check if user password is matched
    if (!(yield user_model_1.User.isPasswordMatched(payload.password, user.password))) {
        throw new HttpError_1.HttpError(401, 'Incorrect password');
    }
    // create jwt token
    const jwtPayload = {
        identifier: user.identifier,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: '7d',
    });
    return {
        token,
    };
});
exports.AuthServices = {
    registerUser,
    loginUser,
};
