import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';
import CompanySeeder from '../seeds/company_seeder';
import LoadTestSeeder from '../seeds/loadTestSeeder';
import EmployeeSeeder from '../seeds/employee_seeder';
import CompanyFactory from '../seeds/factories/company_factory';
import EmployeeFactory from '../seeds/factories/employee_factory';

const {
  postgres: {
    ssl,
    port,
    host,
    database,
    password,
    username,
    postgresUrl,
    loadTestSeeding,
  },
} = config;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  ssl,
  host,
  port,
  database,
  password,
  username,
  url: postgresUrl,
  entities: [Company, Employee],
  factories: [CompanyFactory, EmployeeFactory],
  seeds: loadTestSeeding ? [LoadTestSeeder] : [CompanySeeder, EmployeeSeeder],
};

export const dataSource = new DataSource(options);

export const connectTypeormWithPostgres = async () => {
  try {
    await dataSource.initialize();

    console.log('TypeORM with Postgres has been connected!');
  } catch (error) {
    console.error('Error during TypeORM with Postgres connection ', error);
  }
};

export default options;
