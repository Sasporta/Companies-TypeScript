import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';
import CompanyFactory from '../seeds/companies/factory';
import EmployeeFactory from '../seeds/employees/factory';
import LoadTestSeeder from '../seeds/companies/seedingWithFactory';

const {
	db: { database, host, password, port, url, username },
} = config;

const ssl =
	process.env.NODE_ENV !== 'production' ? false : { rejectUnauthorized: false };

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
	seeds: [LoadTestSeeder],
	factories: [CompanyFactory, EmployeeFactory],
};

export const dataSource = new DataSource(options);

export default options;
