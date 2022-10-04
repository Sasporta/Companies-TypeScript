import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import Redis from '../../../../services/Redis';
import Mongo from '../../../../services/Mongo';
import Postgres from '../../../../services/Postgres';
import { getAllCousinsRequestTest } from './getAllCousins';
import { getAllMetadataRequestTest } from './employeesMetadata/getAll';
import { getOneMetadataRequestTest } from './employeesMetadata/getOne';

describe('employees CRUD requests', () => {
  beforeAll(
    async () =>
      await Promise.all([Mongo.connect(), Postgres.connect(), Redis.connect()]),
  );

  afterAll(
    async () =>
      await Promise.all([
        Mongo.disconnect(),
        Postgres.disconnect(),
        Redis.disconnect(),
      ]),
  );

  getAllMetadataRequestTest();
  getOneMetadataRequestTest();
  getAllCousinsRequestTest();
  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
