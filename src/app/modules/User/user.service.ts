import { HttpError } from "../../errors/HttpError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsers = async () => {

    const users = await User.find();


    if (users.length === 0) {
        throw new HttpError(404, 'No user record were found in the database');
    }

    return users;
};

const getUserById = async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new HttpError(404, 'No user found with ID');
    }

    return user;
};

const updateUserById = async (id: string, payload: Partial<TUser>, userEmail?: string, userPhoneNumber?: string) => {
    const user = await User.findOne({ _id: id, isDeleted: false });

    // check if user exists
    if (!user) {
        throw new HttpError(404, 'No user found with ID');
    }

    // check if user is banned
    if (user.status === 'banned') {
        throw new HttpError(
            403,
            'Your account is banned. You cannot perform this action.',
        );
    }

    // check if either userEmail or userPhoneNumber matches the stored user data
    const isEmailMatch = userEmail && user.email === userEmail;
    const isPhoneNumberMatch = userPhoneNumber && user.phoneNumber === userPhoneNumber;

    if (!(isEmailMatch || isPhoneNumberMatch)) {
        throw new HttpError(403, 'You are not allowed to update this user');
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: payload },
        { new: true, runValidators: true },
    );

    return updatedUser;
};

const deleteUserById = async (id: string, userEmail?: string,
    userPhoneNumber?: string) => {
    const user = await User.findOne({ _id: id, isDeleted: false });

    // check if user is exists
    if (!user) {
        throw new HttpError(404, 'No user found with ID');
    }

    // check if user is banned
    if (user.status === 'banned') {
        throw new HttpError(
            403,
            'Your account is banned. You cannot perform this action.',
        );
    }

    // Ensure the logged-in user can only delete their own account
    const isEmailMatch = userEmail && user.email === userEmail;
    const isPhoneNumberMatch = userPhoneNumber && user.phoneNumber === userPhoneNumber;


    if (!(isEmailMatch || isPhoneNumberMatch)) {
        throw new HttpError(403, 'You are not allowed to delete this user');
    }


    const deletedUser = await User.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        { new: true },
    );

    return deletedUser;
};


export const UserServices = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
}