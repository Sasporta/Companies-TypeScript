import config from '../../../config';
import { ErrorRequestHandler } from 'express';

const { logs: { allowLogs } } = config;

export const logErrors: ErrorRequestHandler = (error, req, res, next) => {
  allowLogs && console.log(error);

  next(error);
};
