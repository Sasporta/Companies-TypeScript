import mongoose from 'mongoose';

import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { redis } from '../../../config/redis';
import { connectMongoDB } from '../../../config/mongo';

describe('employeesMetadata CRUD requests', () => {
  beforeAll(async () => await connectMongoDB());
  afterAll(async () => {
    redis.disconnect();
    await mongoose.connection.close();
  });

  getAllRequestTest();
  getOneRequestTest();
});
