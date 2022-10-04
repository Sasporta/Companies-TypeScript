import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import Redis from '../../../../services/Redis';
import Postgres from '../../../../services/Postgres';

describe('companies CRUD requests', () => {
  beforeAll(
    async () => await Promise.all([Postgres.connect(), Redis.connect()]),
  );

  afterAll(
    async () => await Promise.all([Postgres.disconnect(), Redis.disconnect()]),
  );

  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
