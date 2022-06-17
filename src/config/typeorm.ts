import { DataSource } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';

const { db: { database, host, password, port, url, username } } = config;

const ssl = process.env.NODE_ENV !== 'production' ? false : { rejectUnauthorized: false };

export const dataSource = new DataSource({
  type: 'postgres',
  url,
  ssl,
  host,
  port,
  username,
  password,
  database,
  entities: [Company, Employee],
});