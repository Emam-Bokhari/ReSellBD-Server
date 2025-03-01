import { Document, Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email?: string;
    phoneNumber?: string;
    password: string;
    role?: "user" | "admin",
    status?: "active" | "banned",
    isDeleted?: false,
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
    isUserExists(identifier: string): Promise<TUser | null>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}
