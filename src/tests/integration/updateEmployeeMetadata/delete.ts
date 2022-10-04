import { destroy } from '../../helpers';
import { PATH, testEmployeesUuids } from './testsData';
import { EmployeeMetadataMongo } from '../../../services/Mongo';

export const deleteRequestTest = () => {
  describe("delete employee's metadata and update its manager metadata", () => {
    it("should delete employee's metadata", async () => {
      const { statusCode } = await destroy(
        PATH.EMPLOYEES + '/' + testEmployeesUuids[1],
      );

      await new Promise(res =>
        setTimeout(
          () => res(console.log('waiting for rabbit to process the massages')),
          3000,
        ),
      );

      const employeeMetadata = await EmployeeMetadataMongo.getOne(
        testEmployeesUuids[1],
      );

      expect(statusCode).toBe(204);
      expect(employeeMetadata).toBe(null);
    });

    it("should decrement employee's previous manager's subordinatesCount by 1", async () => {
      const previousManagerMetadata = await EmployeeMetadataMongo.getOne(
        testEmployeesUuids[2],
      );

      expect(previousManagerMetadata?.subordinatesCount).toBe(0);
    });
  });
};
