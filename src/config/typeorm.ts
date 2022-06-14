import { DataSource } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';

const { db: { database, host, password, port, url, username } } = config;

export const dataSource = new DataSource({
  type: 'postgres',
  url,
  host,
  port,
  username,
  password,
  database,
  entities: [Company, Employee],
  ssl: {
    rejectUnauthorized: false,
  },
});
