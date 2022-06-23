import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';
import CompanyFactory from '../seeds/factories/company_factory';
import EmployeeFactory from '../seeds/factories/employee_factory';
import EmployeeSeeder from '../seeds/employee_seeder';
import CompanySeeder from '../seeds/company_seeder';

const {
	db: { database, host, password, port, ssl, url, username },
} = config;

const options: DataSourceOptions & SeederOptions = {
	type: 'postgres',
	url,
	ssl,
	host,
	port,
	username,
	password,
	database,
	entities: [Company, Employee],
	seeds: [CompanySeeder, EmployeeSeeder],
	factories: [CompanyFactory, EmployeeFactory],
};

export const dataSource = new DataSource(options);

export default options;
