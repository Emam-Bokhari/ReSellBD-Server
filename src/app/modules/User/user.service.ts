import QueryBuilder from '../../builder/QueryBuilder';
import { HttpError } from '../../errors/HttpError';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query).sortBy().paginate();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  if (result.length === 0) {
    throw new HttpError(404, 'No user record were found in the database');
  }

  return {
    meta,
    result,
  };
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new HttpError(404, 'No user found with ID');
  }

  return user;
};

const getMe = async (identifier: string) => {
  if (!identifier) {
    throw new Error('Identifier is required to retrieve user information.');
  }

  // check if the user exists
  const existingUser = await User.isUserExists(identifier);

  if (!existingUser) {
    throw new Error('User not found.');
  }

  const user = await User.findOne({ identifier }).select('-password');

  return user;
};

const updateUser = async (payload: Partial<TUser>, identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const updatedProfile = await User.findOneAndUpdate(
    { identifier: identifier },
    payload,
    { new: true, runValidators: true },
  );

  return updatedProfile;
};

const updateUserStatusById = async (
  id: string,
  status: string,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'User not found');

  const updatedStatus = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { status: status },
    { runValidators: true, new: true },
  );

  if (!updatedStatus) throw new HttpError(404, 'No user found with this ID');

  return updatedStatus;
};

const updateUserRoleById = async (
  id: string,
  role: string,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'User not found');

  const updatedStatus = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { role: role },
    { runValidators: true, new: true },
  );

  if (!updatedStatus) throw new HttpError(404, 'No user found with this ID');

  return updatedStatus;
};

const deleteUserById = async (id: string, identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'User not found');

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
  getMe,
  updateUser,
  updateUserStatusById,
  updateUserRoleById,
  deleteUserById,
};
