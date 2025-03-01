import config from '../../config';
import { HttpError } from '../../errors/HttpError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const registerUser = async (payload: TUser) => {
  // check if user is exists
  const existingUser = await User.isUserExists(payload?.identifier);

  if (existingUser) {
    throw new HttpError(
      400,
      `A user with the identifier '${payload?.identifier}' already exists. Please use a different email or phone number.`,
    );
  }

  const registeredUser = await User.create(payload);

  return registeredUser;
};

const loginUser = async (payload: TLoginUser) => {
  // if either email or phoneNumber is not provided, throw an error
  if (!payload.identifier) {
    throw new HttpError(400, 'Email or phone number must be provided');
  }

  // use the identifier (email or phone number) to check if the user exists
  const user = await User.isUserExists(payload.identifier);
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
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new HttpError(401, 'Incorrect password');
  }

  // create jwt token
  const jwtPayload = {
    identifier: user.identifier,
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
};
