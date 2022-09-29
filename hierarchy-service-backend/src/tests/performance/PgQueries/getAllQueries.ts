import { testQueryPerformance } from '../settings';
import { getAllCompaniesQuery } from '../../../pgQueries/companies/getAll';
import { getAllEmployeesQuery } from '../../../pgQueries/employees/getAll';
import { getAllCousinsQuery } from '../../../pgQueries/employees/getAllCousins';

export const queriesLoadTest = () => {
  describe('getAll queries performance tests', () => {
    describe('getAllCompaniesQuery', () =>
      testQueryPerformance(getAllCompaniesQuery)(100));

    describe('getAllEmployeesQuery', () =>
      testQueryPerformance(getAllEmployeesQuery)(
        'f791f842-7616-4cc0-82d8-e3151faf545c',
        '253b3a9e-c84a-4859-b91a-3217afa3ae78',
        100,
      ));

    describe('getAllCousinsQuery', () =>
      testQueryPerformance(getAllCousinsQuery)(
        '9d99efe0-009e-438b-b20a-87b4db810b1d',
        100,
      ));
  });
};
