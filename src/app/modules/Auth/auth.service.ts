import config from "../../config";
import { HttpError } from "../../errors/HttpError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";

const registerUser = async (payload: TUser) => {

    // check email or phone number is provided
    if (!payload.email && !payload.phoneNumber) {
        throw new HttpError(
            400,
            "Either email or phone number is required for registration."
        );
    }

    // check if user is exists
    const existingUser = await User.isUserExists(payload?.email as string || payload?.phoneNumber as string);

    if (existingUser) {
        throw new HttpError(
            400,
            `User with this email '${payload?.email}' or phone number '${payload?.phoneNumber}' already exists. Please use a different email or phone number.`,
        );
    }

    const registeredUser = await User.create(payload);

    return registeredUser;
};

const loginUser = async (payload: TLoginUser) => {

    const { email, phoneNumber, password } = payload;

    // identifier based on the available input
    const identifier = email || phoneNumber;

    // if either email or phoneNumber is not provided, throw an error
    if (!identifier) {
        throw new HttpError(400, 'Email or phone number must be provided');
    }

    // use the identifier (email or phone number) to check if the user exists
    const user = await User.isUserExists(identifier);
    if (!user) {
        throw new HttpError(404, 'User not found');
    }

    // check if user is already deleted
    if (user.isDeleted) {
        throw new HttpError(404, 'The user is already deleted');
    }

    // check if user is already banned
    if (user.status === 'banned') {
        throw new HttpError(403, 'The user account is banned.');
    }

    // check if user password is matched
    if (!(await User.isPasswordMatched(password, user.password))) {
        throw new HttpError(401, 'Incorrect password');
    }

    // create jwt token
    const jwtPayload = {
        identifier: user?.email || user?.phoneNumber,  // using identifier for flexibility
        role: user?.role,
    };

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: '7d',
    });

    return {
        token,
    };
};

export const AuthServices = {
    registerUser,
    loginUser,
}
