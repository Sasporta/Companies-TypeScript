import { mockAllBasics } from '../__mocks__';
import { mockCompany } from '../__mocks__/company';
import { mockEmployee } from '../__mocks__/employee';

import { postRequestTest } from './post';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';

describe('companies CRUD requests', () => {
  beforeAll(() => {
    mockCompany();
    mockEmployee();
    mockAllBasics();
  });

  postRequestTest();
  updateRequestTest();
  deleteRequestTest();
  getAllRequestTest();
  getOneRequestTest();
});

