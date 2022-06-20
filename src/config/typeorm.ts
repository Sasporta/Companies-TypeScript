import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import CompanySeeder from '../seeds/companies';
import { Employee } from '../entities/Employee';
import EmployeeSeeder from '../seeds/employees';

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
	seeds: [CompanySeeder, EmployeeSeeder],
};

export const dataSource = new DataSource(options);

export default options;
