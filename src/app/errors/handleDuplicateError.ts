/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from '../interface/error';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractMessage = match && match[1];

  const error: TError = [
    {
      path: '',
      message: `${extractMessage} is already exist!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Key Error: Conflict with an existing entry.',
    error,
  };
};
