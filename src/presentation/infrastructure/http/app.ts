/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

import '@presentation/infrastructure/typeorm';
import '@presentation/container';
import routes from '@presentation/infrastructure/http/routes';
import AppError from '@presentation/errors/AppError';

interface ValidationError {
  [key: string]: string;
}

export const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (errors: Error, request: Request, response: Response, _: NextFunction) => {
    if (errors instanceof AppError) {
      return response.status(errors.statusCode).json({
        status: 'error',
        message: errors.message,
      });
    }
    if (isCelebrateError(errors)) {
      const validateErrors: ValidationError = {};

      errors.details.forEach((error) => {
        error.details.map((validateError) => {
          validateErrors[validateError.path[0]] = validateError.message;
        });
      });

      return response.status(400).json({
        status: 'Validate Fails',
        errors: validateErrors,
      });
    }
    console.log(errors);
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);
