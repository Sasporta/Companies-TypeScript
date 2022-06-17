import { DataSource } from 'typeorm';

import config from '.';
import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';

const { db: { database, host, password, port, url, username } } = config;

const dbCredentials = url
? {
  url,
  ssl: {
    rejectUnauthorized: false,
  },
}
: {
  host,
  port,
  username,
  password,
  database,
};

export const dataSource = new DataSource({
  type: 'postgres',
  ...dbCredentials,
  entities: [Company, Employee],
});