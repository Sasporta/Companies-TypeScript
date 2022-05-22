import request from 'superTest';
import { runSeeders } from 'typeorm-extension';

import app from '../app';
import { dataSource } from '../config/typeorm';
import resDoc from '../swagger/docs/components/responses';

import CompanySeeder from '../seeds/companies';
import EmployeeSeeder from '../seeds/employees';

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
      await runSeeders(dataSource, { seeds: [CompanySeeder, EmployeeSeeder]});
    });

    afterAll(async () => {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    })
  }
};
