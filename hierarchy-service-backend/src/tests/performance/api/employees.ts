import { testGetReqPerformance } from '../settings';

export const employeesLoadTest = () => {
  describe('employees api performance tests', () => {
    describe('getAllCousins', () =>
      testGetReqPerformance(
        '/employees/cousins/9d99efe0-009e-438b-b20a-87b4db810b1d?limit=100',
      ));

    describe('getAll', () =>
      testGetReqPerformance(
        '/employees?companyUuid=f791f842-7616-4cc0-82d8-e3151faf545c&managerUuid=253b3a9e-c84a-4859-b91a-3217afa3ae78&limit=100',
      ));

    describe('getOne', () =>
      testGetReqPerformance('/employees/253b3a9e-c84a-4859-b91a-3217afa3ae78'));

    // NOTE: not using query builder for comparison
    // describe('getAllCousinsB', () =>
    // 	testGetRequestPerformance(
    // 		'/employeesb/cousins/9d99efe0-009e-438b-b20a-87b4db810b1d?limit=100',
    // 	));

    // describe('getAllB', () =>
    // 	testGetRequestPerformance(
    // 		'/employeesb?companyUuid=f791f842-7616-4cc0-82d8-e3151faf545c&managerUuid=253b3a9e-c84a-4859-b91a-3217afa3ae78&limit=100',
    // 	));
  });
};
