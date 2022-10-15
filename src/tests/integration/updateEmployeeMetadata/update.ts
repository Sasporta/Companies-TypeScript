import { get, patch } from './helpers';
import { PATH, testEmployeesUuids, UPDATED } from './testsData';
import EmployeeMetadata from '../../../models/EmployeeMetadata';

export const updateRequestTest = () => {
  describe("update employees metadata when updating employee's company and manager", () => {
    it("should update employee's metadata's companyUuid", async () => {
      const { statusCode } = await patch(
        PATH.EMPLOYEES + '/' + testEmployeesUuids[1],
      ).send(UPDATED.employeeToDiffCompanyAndManager);

      await new Promise(res =>
        setTimeout(
          () => res(console.log('waiting for rabbit to process the massages')),
          3000,
        ),
      );

      const employeeMetadata = await EmployeeMetadata.findOne(
        {
          _id: testEmployeesUuids[1],
        },
        { companyUuid: true },
      );

      expect(statusCode).toBe(200);
      expect(employeeMetadata?.companyUuid).toBe(
        UPDATED.employeeToDiffCompanyAndManager.companyUuid,
      );
    });

    it("should decrement employee's previous manager's subordinatesCount by 1", async () => {
      const { body: previousManagerMetadata } = await get(
        PATH.EMPLOYEES_METADATA + '/' + testEmployeesUuids[0],
      );

      expect(previousManagerMetadata?.subordinatesCount).toBe(0);
    });

    it("should increment employee's future manager's subordinatesCount by 1", async () => {
      const { body: futureManagerMetadata } = await get(
        PATH.EMPLOYEES_METADATA + '/' + testEmployeesUuids[2],
      );

      expect(futureManagerMetadata?.subordinatesCount).toBe(1);
    });
  });
};
