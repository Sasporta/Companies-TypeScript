import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { CompanyEntity } from '../entities/Company';
import { EXISTING } from '../tests/api/testsData';

export default class CompanySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.getRepository(CompanyEntity).insert(EXISTING.companies);
  }
}
