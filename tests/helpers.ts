import request from 'superTest';
import responses from '../swagger/docs/components/responses';

import app from '../app';

export const { get, post, patch, delete: destroy } = request(app);

const errorObj = (errorCode: number) => ({
  error: {
    message: responses[errorCode],
  },
});

export const testError = (crudMethod: (a: string) => any, path: string, errorCode: number, reqBody: object = {}) => {
  it(`should return ${errorCode} status with proper error message`, async () => {
    const res = await crudMethod(path).send(reqBody);

    expect(res.statusCode).toBe(errorCode);
    expect(res.body).toStrictEqual(errorObj(errorCode));
  });
};
