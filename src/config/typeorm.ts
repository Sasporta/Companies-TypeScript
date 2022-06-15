import { DataSource } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';

const { db: { database, host, password, port, url, username } } = config;

export const dataSource = url
? new DataSource({
  type: 'postgres',
  url,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Company, Employee],
})
: new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [Company, Employee],
});
