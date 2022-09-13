import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  res.status(error.status ?? 500).json(error.message);
};
