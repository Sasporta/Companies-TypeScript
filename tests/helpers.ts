import request from 'superTest';

import app from '../app';
import { dataSource } from '../config/typeorm';
import resDoc from '../swagger/docs/components/responses';

export const { get, post, patch, delete: destroy } = request(app);

export const testError = (crudMethod: (a: string) => any, path: string, errorCode: number, reqBody: object = {}) => {
  it(`should return ${errorCode} status with proper error message`, async () => {
    const { status, body } = await crudMethod(path).send(reqBody);

    expect(status).toBe(errorCode);
    expect(body).toStrictEqual(resDoc.responses[errorCode]);
  });
};

export const applySetup = async (mocks: (() => void)[]) => {
  if (process.env.MOCK === 'true') {
    beforeAll(() => mocks.forEach(m => m()));
  }
  else {
    beforeAll(async () => {
      await dataSource.initialize();
      // await seedDb();
    });
    // afterAll(async () => await flushDb())
  }
};
