/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { handleZodValidationError } from '../errors/handleZodValidationError';
import config from '../config';
import express from 'express';
import { TError } from '../interface/error';
import { handleValidationError } from '../errors/handleValidationError';
import { handleCastError } from '../errors/handleCastError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { HttpError } from '../errors/HttpError';

export const globalErrorHandler = ((
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  let error: TError = [
    {
      path: '',
      message: '',
    },
  ];

  if (err instanceof ZodError) {
    const formattedZodError = handleZodValidationError(err);

    statusCode = formattedZodError?.statusCode;
    message = formattedZodError?.message;
    error = formattedZodError?.error;
  } else if (err?.name === 'ValidationError') {
    const formattedValidationError = handleValidationError(err);
    statusCode = formattedValidationError?.statusCode;
    message = formattedValidationError?.message;
    error = formattedValidationError?.error;
  } else if (err?.name === 'CastError') {
    const formattedCastError = handleCastError(err);
    statusCode = formattedCastError?.statusCode;
    message = formattedCastError?.message;
    error = formattedCastError?.error;
  } else if (err?.code === 11000) {
    const formattedDuplicateError = handleDuplicateError(err);
    statusCode = formattedDuplicateError?.statusCode;
    message = formattedDuplicateError?.message;
    error = formattedDuplicateError?.error;
  } else if (err instanceof HttpError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
    error,
    stack: config.node_env === 'development' ? err.stack : null,
  });
}) as unknown as express.ErrorRequestHandler;
