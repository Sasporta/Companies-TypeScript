import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { dataSource } from '../../../config/typeorm';

describe('employees CRUD requests', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());

  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
