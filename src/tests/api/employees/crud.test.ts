import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { connectDb, disconnectDb } from '../../helpers';
import { getAllCousinsRequestTest } from './getAllCousins';

describe('employees CRUD requests', () => {
  beforeAll(async () => await connectDb());
  afterAll(async () => await disconnectDb());

  getAllCousinsRequestTest();
  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
