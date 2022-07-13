import { dataSource } from '../../../config/typeorm';
import { maxTestingTime, testGetPerformance } from './settings';

describe('employees api performance tests', () => {
	beforeAll(async () => await dataSource.initialize());
	afterAll(async () => await dataSource.destroy());

	jest.setTimeout(maxTestingTime);

	describe('getAllCousins', () =>
		testGetPerformance(
			'/employees/cousins/9d99efe0-009e-438b-b20a-87b4db810b1d?limit=100',
		));

	describe('getAll', () =>
		testGetPerformance(
			'/employees?companyUuid=f791f842-7616-4cc0-82d8-e3151faf545c&managerUuid=253b3a9e-c84a-4859-b91a-3217afa3ae78&limit=100',
		));

	describe('getOne', () =>
		testGetPerformance('/employees/253b3a9e-c84a-4859-b91a-3217afa3ae78'));

	// NOTE: not using query builder for comparison
	// describe('getAllCousinsB', () =>
	// 	testGetPerformance(
	// 		'/employeesb/cousins/9d99efe0-009e-438b-b20a-87b4db810b1d?limit=100',
	// 	));

	// describe('getAllB', () =>
	// 	testGetPerformance(
	// 		'/employeesb?companyUuid=f791f842-7616-4cc0-82d8-e3151faf545c&managerUuid=253b3a9e-c84a-4859-b91a-3217afa3ae78&limit=100',
	// 	));
});
