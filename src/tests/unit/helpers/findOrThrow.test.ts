import { Company } from '../../../entities/Company';
import { dataSource } from '../../../config/typeorm';
import { findOrThrow } from '../../../controllers/helpers';
import { existingCompanies } from '../../api/companiesData';

describe('findOrThrow function', () => {
	beforeAll(async () => await dataSource.initialize());
	afterAll(async () => await dataSource.destroy());

	it('should return the found entity if the returned value is different then null or undefined', async () => {
		expect(
			await findOrThrow(Company, existingCompanies[3].uuid, 404),
		).toHaveProperty('uuid', existingCompanies[3].uuid);
	});

	it('should throw an error if the returned value is null or undefined', async () => {
		const errorCatcher = async () => {
			try {
				return await findOrThrow(
					Company,
					'a1111111-b222-c333-d444-e55555555555',
					404,
				);
			} catch (error) {
				return error;
			}
		};

		expect(await errorCatcher()).toHaveProperty('status', 404);
	});
});
