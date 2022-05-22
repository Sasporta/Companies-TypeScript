import { applySetup } from '../../helpers';
import { mockAllBasics } from '../__mocks__';
import { mockCompany } from '../__mocks__/company';
import { mockEmployee } from '../__mocks__/employee';

import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';

describe('employees CRUD requests', () => {
  applySetup([mockAllBasics, mockCompany, mockEmployee]);

  getAllRequestTest();
  getOneRequestTest();
  updateRequestTest();
  deleteRequestTest();
  postRequestTest();
});
