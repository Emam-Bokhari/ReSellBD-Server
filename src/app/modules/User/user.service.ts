import { HttpError } from "../../errors/HttpError";
import { User } from "./user.model";

const getAllUsers = async () => {

    const users = await User.find();


    if (users.length === 0) {
        throw new HttpError(404, 'No user record were found in the database');
    }

    return users;
};

export const UserServices = {
    getAllUsers,
}