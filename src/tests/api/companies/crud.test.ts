import { postRequestTest } from './post';
import Redis from '../../../services/Redis';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { dataSource } from '../../../config/typeorm';

describe('companies CRUD requests', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(
    async () =>
      await Promise.all([Redis.instance.disconnect(), dataSource.destroy()]),
  );

  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
