import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { redis } from '../../../config/redis';
import { dataSource } from '../../../config/typeorm';

describe('companies CRUD requests', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(
    async () => await Promise.all([redis.disconnect(), dataSource.destroy()]),
  );

  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
