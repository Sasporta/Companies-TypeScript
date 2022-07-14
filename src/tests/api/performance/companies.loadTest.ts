import { dataSource } from '../../../config/typeorm';
import { maxTestingTime, testGetPerformance } from './settings';

describe('companies api performance tests', () => {
	beforeAll(async () => await dataSource.initialize());
	afterAll(async () => await dataSource.destroy());

	jest.setTimeout(maxTestingTime);

	describe('getAll', () => testGetPerformance('/companies?limit=100'));

	describe('getOne', () =>
		testGetPerformance('/companies/f791f842-7616-4cc0-82d8-e3151faf545c'));
});
