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
exports.UserServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const HttpError_1 = require("../../errors/HttpError");
const user_model_1 = require("./user.model");
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query).sortBy().paginate();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    if (result.length === 0) {
        throw new HttpError_1.HttpError(404, 'No user record were found in the database');
    }
    return {
        meta,
        result,
    };
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    return user;
});
const getMe = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    if (!identifier) {
        throw new Error('Identifier is required to retrieve user information.');
    }
    // check if the user exists
    const existingUser = yield user_model_1.User.isUserExists(identifier);
    if (!existingUser) {
        throw new Error('User not found.');
    }
    const user = yield user_model_1.User.findOne({ identifier }).select('-password');
    return user;
});
const updateUser = (payload, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, "User not found");
    }
    const updatedProfile = yield user_model_1.User.findOneAndUpdate({ identifier: identifier }, payload, { new: true, runValidators: true });
    return updatedProfile;
});
const updateUserStatusById = (id, status, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user)
        throw new HttpError_1.HttpError(404, 'User not found');
    const updatedStatus = yield user_model_1.User.findOneAndUpdate({ _id: id, isDeleted: false }, { status: status }, { runValidators: true, new: true });
    if (!updatedStatus)
        throw new HttpError_1.HttpError(404, 'No user found with this ID');
    return updatedStatus;
});
const deleteUserById = (id, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id, isDeleted: false });
    // check if user is exists
    if (!user) {
        throw new HttpError_1.HttpError(404, 'No user found with ID');
    }
    // check if user is banned
    if (user.status === 'banned') {
        throw new HttpError_1.HttpError(403, 'Your account is banned. You cannot perform this action.');
    }
    // Check if identifier matches the stored user data
    const isIdentifierMatch = identifier && user.identifier === identifier;
    if (!isIdentifierMatch) {
        throw new HttpError_1.HttpError(403, 'You are not allowed to update this user');
    }
    const deletedUser = yield user_model_1.User.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return deletedUser;
});
exports.UserServices = {
    getAllUsers,
    getUserById,
    getMe,
    updateUser,
    updateUserStatusById,
    deleteUserById,
};
