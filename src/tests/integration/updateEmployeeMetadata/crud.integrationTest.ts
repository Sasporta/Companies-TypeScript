import { postRequestTest } from './post';
import Redis from '../../../services/Redis';
import Mongo from '../../../services/Mongo';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import Rabbit from '../../../services/rabbitMQ';
import Postgres from '../../../services/Postgres';

describe('employees CRUD requests', () => {
  beforeAll(
    async () => {
      await new Promise(res =>
        setTimeout(
          () => res(console.log('waiting for rabbit to initialize')),
          10000,
        ),
      );

      await Promise.all([
        Mongo.connect(),
        Postgres.connect(),
        Rabbit.connect(),
        Redis.connect(),
      ]);

    }
  );

  afterAll(
    async () =>
      await Promise.all([
        Mongo.disconnect(),
        Postgres.disconnect(),
        Rabbit.disconnect(),
        Redis.disconnect(),
      ]),
  );

  jest.setTimeout(30000);

  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
