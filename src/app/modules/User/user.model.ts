import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        sparse: true, // allow multiple documents to have null values
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        sparse: true, // allow multiple documents to have null values
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
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

// hashed password by bcrypt
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// password field is empty
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// statics method for check if user exists
userSchema.statics.isUserExists = async function (identifier: string) {
    return await User.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }]
    }).select('+password');
};


export const User = model<TUser, UserModel>("User", userSchema);