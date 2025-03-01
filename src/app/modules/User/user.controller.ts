import { asyncHandler } from "../../../utils/global/asyncHandler";
import { sendResponse } from "../../../utils/global/sendResponse";
import { UserServices } from "./user.service";

const getAllUsersController = asyncHandler(async (req, res) => {
    const users = await UserServices.getAllUsers()

    sendResponse(res, {
        success: true,
        message: 'Users retrieved successfully',
        statusCode: 200,
        data: users,
    });
});

export const UserControllers = {
    getAllUsersController,
}