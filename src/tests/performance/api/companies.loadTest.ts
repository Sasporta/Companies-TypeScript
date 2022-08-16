import { redis } from '../../../config/redis';
import { dataSource } from '../../../config/typeorm';
import { maxTestingTime, testGetReqPerformance } from '../settings';

describe('companies api performance tests', () => {
	beforeAll(async () => await dataSource.initialize());
	afterAll(async () => {
		await dataSource.destroy();
		await redis.disconnect();
	});

	jest.setTimeout(maxTestingTime);

	describe('getAll', () => testGetReqPerformance('/companies?limit=100'));

	describe('getOne', () =>
		testGetReqPerformance('/companies/f791f842-7616-4cc0-82d8-e3151faf545c'));
});
