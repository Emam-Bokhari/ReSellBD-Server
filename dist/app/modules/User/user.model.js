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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const queryFilters_1 = require("../../utils/moduleSpecific/queryFilters");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    identifier: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not a valid role',
        },
        default: 'user',
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'banned'],
            message: '{VALUE} is not a valid status',
        },
        default: 'active',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    // profile update related additional fields
    profilePicture: {
        type: String,
    },
    city: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    postalCode: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not a valid gender',
        },
    },
    bio: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// hashed password by bcrypt
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// password field is empty
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// statics method for check if user exists
// userSchema.statics.isUserExists = async function (identifier: string) {
//     return await User.findOne({
//         $or: [{ email: identifier }, { phoneNumber: identifier }]
//     }).select('+password');
// };
// statics method for check if user exists
userSchema.statics.isUserExists = function (identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ identifier }).select('+password');
    });
};
// statics method for password matched
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
// query middleware for soft delete by utils
userSchema.pre('find', queryFilters_1.excludeDeletedQuery);
userSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregation middleware for soft delete by utils
userSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.User = (0, mongoose_1.model)('User', userSchema);
