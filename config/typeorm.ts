import { DataSource } from 'typeorm';

import config from '.';

const { db: { host, port, username, password, database } } = config;

export const dataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
});
