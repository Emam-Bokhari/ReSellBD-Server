import { HttpError } from "../../errors/HttpError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";

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

export const AuthServices = {
    registerUser,
}
