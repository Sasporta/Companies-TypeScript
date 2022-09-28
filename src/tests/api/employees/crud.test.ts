import mongoose from 'mongoose';

import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { redis } from '../../../config/redis';
import { dataSource } from '../../../config/typeorm';
import { connectMongoDB } from '../../../config/mongo';
import { getAllCousinsRequestTest } from './getAllCousins';
import { getAllMetadataRequestTest } from './employeesMetadata/getAll';
import { getOneMetadataRequestTest } from './employeesMetadata/getOne';

describe('employees CRUD requests', () => {
  beforeAll(
    async () => await Promise.all([dataSource.initialize(), connectMongoDB()]),
  );
  afterAll(
    async () =>
      await Promise.all([
        redis.disconnect(),
        dataSource.destroy(),
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
