import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { connectDb, disconnectDb } from '../../helpers';

describe('employees CRUD requests', () => {
  beforeAll(async () => await connectDb());
  afterAll(async () => await disconnectDb());

  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
