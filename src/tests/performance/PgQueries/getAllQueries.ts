import Company from '../../../services/Company';
import Employee from '../../../services/Employee';
import { testQueryPerformance } from '../settings';

export const queriesLoadTest = () => {
  describe('getAll queries performance tests', () => {
    describe('companies getAllQuery', () =>
      testQueryPerformance(Company.getAll)(100));

    describe('employees getAllQuery', () =>
      testQueryPerformance(Employee.getAll)(
        'f791f842-7616-4cc0-82d8-e3151faf545c',
        '253b3a9e-c84a-4859-b91a-3217afa3ae78',
        100,
      ));

    describe('employees getAllCousinsQuery', () =>
      testQueryPerformance(Employee.getAllCousins)(
        '9d99efe0-009e-438b-b20a-87b4db810b1d',
        100,
      ));
  });
};
