import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { EmployeeEntity } from '../entities/Employee';
import { EXISTING } from '../tests/api/testsData';

export default class EmployeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.getRepository(EmployeeEntity).insert(EXISTING.employees);
  }
}
