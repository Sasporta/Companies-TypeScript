import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  res.status(error.status ?? 500).json(error.message);
};
