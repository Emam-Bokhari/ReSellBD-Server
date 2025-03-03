import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import { TUserRole } from '../modules/User/user.interface';
import { asyncHandler } from '../../utils/global/asyncHandler';

export const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // // check if no token
      if (!token) {
        throw new HttpError(
          401,
          'Access token is missing or invalid. Please provide a valid token to access this resource.',
        );
      }

      // // token verify
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // console.log(decoded)

      const { identifier, role } = decoded;

      // check if the user exists using the identifier
      const user = await User.isUserExists(identifier);
      if (!user) {
        throw new HttpError(
          404,
          'Invalid credentials or session. Please try logging in again',
        );
      }

      // check if the user is already deleted
      if (user.isDeleted) {
        throw new HttpError(404, 'The user is already deleted');
      }

      // // check if the user is banned
      if (user.status === 'banned') {
        throw new HttpError(
          403,
          'Your account has been banned. Please contact support for assistance.',
        );
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new HttpError(
          403,
          'Access denied. Your role does not have the necessary permissions to perform this action.',
        );
      }

      req.user = decoded as JwtPayload;

      next();
    },
  );
};
