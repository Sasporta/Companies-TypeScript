import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Company } from '../entities/Company';
import { existingCompanies } from '../tests/api/companiesData';

export default class CompanySeeder implements Seeder {
	public async run(dataSource: DataSource): Promise<any> {
		await dataSource.getRepository(Company).insert(existingCompanies);
	}
}
