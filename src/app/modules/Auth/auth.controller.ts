import { asyncHandler } from "../../../utils/global/asyncHandler";
import { sendResponse } from "../../../utils/global/sendResponse";
import { AuthServices } from "./auth.service";

const registerUserController = asyncHandler(async (req, res) => {
    const registerUserPayload = req.body;
    const registeredUser = await AuthServices.registerUser(registerUserPayload);

    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
        data: registeredUser,
    });
});

export const AuthControllers = {
    registerUserController,
}