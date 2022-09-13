import { ErrorRequestHandler } from 'express';

export const logErrors: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  next(error);
};
