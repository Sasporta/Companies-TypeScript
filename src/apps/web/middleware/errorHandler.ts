import { ErrorRequestHandler } from 'express';

const responses = {
  204: 'Successful request, no content',
  404: 'Item not Found',
  422: 'Unprocessable entity, missing or invalid parameters',
  500: 'Internal Server Error',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.status || (error.errors ? 422 : 500);

  res.status(status).json(responses[status]);
};
