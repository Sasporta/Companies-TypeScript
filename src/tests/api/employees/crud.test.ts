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

describe('employees CRUD requests', () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await connectMongoDB();
  });
  afterAll(async () => {
    redis.disconnect();
    await dataSource.destroy();
    await mongoose.connection.close();
  });

  getAllCousinsRequestTest();
  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
