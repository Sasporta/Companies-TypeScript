import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { dataSource } from '../../../config/typeorm';

describe('employees CRUD requests', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());

  getAllRequestTest();
  getOneRequestTest();
});
