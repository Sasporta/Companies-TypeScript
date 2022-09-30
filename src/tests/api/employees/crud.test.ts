import mongoose from 'mongoose';

import { postRequestTest } from './post';
import Redis from '../../../services/Redis';
import Mongo from '../../../services/Mongo';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { dataSource } from '../../../config/typeorm';
import { getAllCousinsRequestTest } from './getAllCousins';
import { getAllMetadataRequestTest } from './employeesMetadata/getAll';
import { getOneMetadataRequestTest } from './employeesMetadata/getOne';

describe('employees CRUD requests', () => {
  beforeAll(
    async () => await Promise.all([dataSource.initialize(), Mongo.connect()]),
  );
  afterAll(
    async () =>
      await Promise.all([
        dataSource.destroy(),
        Redis.instance.disconnect(),
        mongoose.connection.close(),
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
