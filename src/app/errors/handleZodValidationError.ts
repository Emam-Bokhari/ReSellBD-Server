import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

export const handleZodValidationError = (
  err: ZodError,
): TGenericErrorResponse => {
  const error = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
    error,
  };
};
