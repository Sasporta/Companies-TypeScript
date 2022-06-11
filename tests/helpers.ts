import request from 'superTest';
import { dataSource } from '../config/typeorm';

import app from '../app';
import resDoc from '../swagger/docs/components/responses';

import { mockAllBasics } from './api/__mocks__';
import { mockCompany } from './api/__mocks__/companies/mockFunctions';
import { mockEmployee } from './api/__mocks__/employees/mockFunctions';

export const { get, post, patch, delete: destroy } = request(app);

export const connectDb = async () => {
  if (process.env.MOCK !== 'true') {
    await dataSource.initialize();
  } else {
    mockAllBasics();
    mockEmployee();
    mockCompany();
  }
}

export const disconnectDb = async () => {
  if (process.env.MOCK !== 'true') await dataSource.destroy();
}

export const testError = (crudMethod: (a: string) => any, path: string, errorCode: number, reqBody: object = {}) => {
  it(`should return ${errorCode} status with proper error message`, async () => {
    const { status, body } = await crudMethod(path).send(reqBody);

    expect(status).toBe(errorCode);
    expect(body).toStrictEqual(resDoc.responses[errorCode]);
  });
}