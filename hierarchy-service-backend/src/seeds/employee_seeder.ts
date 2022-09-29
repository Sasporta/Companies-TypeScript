import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Employee } from '../entities/Employee';
import { EXISTING } from '../tests/api/testsData';

export default class EmployeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.getRepository(Employee).insert(EXISTING.employees);
  }
}
