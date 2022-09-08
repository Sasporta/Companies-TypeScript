import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Employee } from '../entities/Employee';
import { existingEmployees } from '../tests/api/employeesData';

export default class EmployeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.getRepository(Employee).insert(existingEmployees);
  }
}
