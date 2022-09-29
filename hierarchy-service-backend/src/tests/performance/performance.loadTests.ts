import { get } from './settings';
import { redis } from '../../config/redis';
import { dataSource } from '../../config/typeorm';
import { companiesLoadTest } from './api/companies';
import { employeesLoadTest } from './api/employees';
import { queriesLoadTest } from './PgQueries/getAllQueries';

describe('performance tests', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(
    async () => await Promise.all([redis.disconnect(), dataSource.destroy()]),
  );

  jest.setTimeout(30000);

  it('should wake the dyno from its idle state', async () => {
    const { status } = await get('/api-docs');

    expect(status).toBe(301);
  });

  queriesLoadTest();

  companiesLoadTest();

  employeesLoadTest();
});
