import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { UserServices } from './user.service';

const getAllUsersController = asyncHandler(async (req, res) => {
  const query = req.query;
  const users = await UserServices.getAllUsers(query);

  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: 200,
    data: users,
  });
});

const getUserControllerById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await UserServices.getUserById(id);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 200,
    data: user,
  });
});

const getMeController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const user = await UserServices.getMe(identifier);
  sendResponse(res, {
    success: true,
    message: 'User profile retrieve successfully',
    statusCode: 200,
    data: user,
  });
});

const updateUserController = asyncHandler(async (req, res) => {

  const { identifier } = req.user;
  const updatedPayload = req.body;
  const updatedUser = await UserServices.updateUser(
    updatedPayload,
    identifier,
  );

  sendResponse(res, {
    success: true,
    message: 'User update successfully',
    statusCode: 200,
    data: updatedUser,
  });
});

const updateUserStatusByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { status } = req.body;
  const updatedStatus = await UserServices.updateUserStatusById(
    id,
    status,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'User status updated successfully',
    statusCode: 200,
    data: updatedStatus,
  });
});

const deleteUserControllerById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  await UserServices.deleteUserById(id, identifier);
  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const UserControllers = {
  getAllUsersController,
  getUserControllerById,
  getMeController,
  updateUserController,
  updateUserStatusByIdController,
  deleteUserControllerById,
};
