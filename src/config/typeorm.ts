import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

import config from '.';
import { CompanyEntity } from '../entities/Company';
import CompanySeeder from '../seeds/company_seeder';
import LoadTestSeeder from '../seeds/loadTestSeeder';
import { EmployeeEntity } from '../entities/Employee';
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
  entities: [CompanyEntity, EmployeeEntity],
  factories: [CompanyFactory, EmployeeFactory],
  seeds: loadTestSeeding ? [LoadTestSeeder] : [CompanySeeder, EmployeeSeeder],
};

export const dataSource = new DataSource(options);

export default options;
