import { Response } from 'express';

import resDoc from '../swagger/docs/components/responses';

export const errorHandler = (res: Response, status: number, message?: string) => {
  const resJson = errorObj(status, message);

  return res.status(status).json(resJson);
}

export const errorObj = (errorCode: number, message?: string) => ({
  error: {
    status: errorCode,
    message: message || resDoc.responses[errorCode],
  },
});
