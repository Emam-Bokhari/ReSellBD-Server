import { HttpError } from "../../errors/HttpError";
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

export const UserServices = {
    getAllUsers,
    getUserById,
}