import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Company } from '../entities/Company';
import { existingCompanies } from '../tests/api/__mocks__/companies/mockData';
export default class CompanySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource.getRepository(Company).insert(existingCompanies);
  }
}
