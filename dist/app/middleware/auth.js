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
exports.auth = void 0;
const HttpError_1 = require("../errors/HttpError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const asyncHandler_1 = require("../utils/global/asyncHandler");
const auth = (...requiredRoles) => {
    return (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // // check if no token
        if (!token) {
            throw new HttpError_1.HttpError(401, 'Access token is missing or invalid. Please provide a valid token to access this resource.');
        }
        // // token verify
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        // console.log(decoded)
        const { identifier, role } = decoded;
        // check if the user exists using the identifier
        const user = yield user_model_1.User.isUserExists(identifier);
        if (!user) {
            throw new HttpError_1.HttpError(404, 'Invalid credentials or session. Please try logging in again');
        }
        // check if the user is already deleted
        if (user.isDeleted) {
            throw new HttpError_1.HttpError(404, 'The user is already deleted');
        }
        // // check if the user is banned
        if (user.status === 'banned') {
            throw new HttpError_1.HttpError(403, 'Your account has been banned. Please contact support for assistance.');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new HttpError_1.HttpError(403, 'Access denied. Your role does not have the necessary permissions to perform this action.');
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
