const request = require('superTest');

import { dataSource } from '../config/typeorm';

import app from '../app';
import resDoc from '../swagger/docs/components/responses';

import { mockTypeOrmMethods } from './api/__mocks__/typeOrmMethods';
import { mockCreateQueryBuilder } from './api/__mocks__/queryBuilder';
import { mockEntitiesMethods } from './api/__mocks__/entities/entitiesMethods';

export const { get, post, patch, delete: destroy } = request(app);

export const connectDb = async () => {
  if (process.env.MOCK !== 'true') {
    await dataSource.initialize();
  } else {
    mockTypeOrmMethods();
    mockEntitiesMethods();
    mockCreateQueryBuilder();
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