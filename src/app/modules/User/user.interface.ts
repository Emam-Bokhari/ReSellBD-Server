import { Document, Model, Types } from "mongoose";

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

export interface UserModel extends Model<TUser> {
    isUserExists(identifier: string): Promise<TUser | null>;
}
