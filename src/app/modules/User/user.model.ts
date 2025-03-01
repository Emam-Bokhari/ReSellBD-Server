import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";

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
    },
    phoneNumber: {
        type: String,
        trim: true,
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
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

// statics method for check if user exists
userSchema.statics.isUserExists = async function (identifier: string) {
    return await User.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }]
    }).select('+password');
};


export const User = model<TUser, UserModel>("User", userSchema);