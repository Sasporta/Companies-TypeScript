import { postRequestTest } from './post';
import Mongo from '../../../services/Mongo';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';

describe('employees CRUD requests', () => {
  beforeAll(async () => {
    await new Promise(res =>
      setTimeout(
        () => res(console.log('waiting for the services to initialize')),
        10000,
      ),
    );

    await Mongo.connect();
  });

  afterAll(async () => await Mongo.disconnect());

  jest.setTimeout(30000);

  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
