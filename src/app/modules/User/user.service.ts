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

const updateUserById = async (
  id: string,
  payload: Partial<TUser>,
  identifier?: string,
) => {
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

  // Check if identifier matches the stored user data
  const isIdentifierMatch = identifier && user.identifier === identifier;

  if (!isIdentifierMatch) {
    throw new HttpError(403, 'You are not allowed to update this user');
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: payload },
    { new: true, runValidators: true },
  );

  return updatedUser;
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

const deleteUserById = async (id: string, identifier: string) => {
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

  // Check if identifier matches the stored user data
  const isIdentifierMatch = identifier && user.identifier === identifier;

  if (!isIdentifierMatch) {
    throw new HttpError(403, 'You are not allowed to update this user');
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
  getMe,
  updateUserById,
  updateUserStatusById,
  deleteUserById,
};
