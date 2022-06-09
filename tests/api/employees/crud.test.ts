import { mockAllBasics } from '../__mocks__';
import { mockCompany } from '../__mocks__/company';
import { mockEmployee } from '../__mocks__/employee';
import { cleanupDb, setupMockOrDb } from '../../helpers';

import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';

describe('employees CRUD requests', () => {
  beforeAll(() => setupMockOrDb([mockAllBasics, mockCompany, mockEmployee]));

  afterAll(() => cleanupDb());

  // getAllRequestTest();
  // getOneRequestTest();
  // updateRequestTest();
  // deleteRequestTest();
  // postRequestTest();
});
