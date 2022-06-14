import { DataSource } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';

const { db: { host, port, username, password, database } } = config;

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  host,
  port,
  username,
  password,
  database,
  entities: [Company, Employee],
});
