import { PATH, EXISTING } from '../testsData';
import Redis from '../../../services/Data/Redis';
import { destroy, testError } from '../../helpers';
import EmployeeService from '../../../services/businessLogic/Employee';
import { EmployeeMetadataDataManager } from '../../../services/Data/Mongo';

export const deleteRequestTest = () => {
  describe('delete employee request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(
        PATH.EMPLOYEES + '/' + EXISTING.employees[1].uuid,
      );

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    it("should delete employee's metadata", async () => {
      const employeeMetadataData = await EmployeeMetadataDataManager.getOne(
        EXISTING.employees[1].uuid,
      );

      expect(employeeMetadataData).toBe(null);
    });

    it("should decrement employee's manager's subordinatesCount by 1", async () => {
      const employeeMetadataData = await EmployeeMetadataDataManager.getOne(
        EXISTING.employeesMetadata[0]._id,
      );

      expect(employeeMetadataData?.subordinatesCount).toBe(1);
    });

    it('should remove cached employee', async () => {
      const result = await Redis.get(
        EmployeeService.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
      );

      expect(result).toStrictEqual(null);
    });

    it('should remove all cached employees lists', async () => {
      const result = await Redis.get(EmployeeService.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when employee uuid invalid', () =>
      testError(
        destroy,
        PATH.EMPLOYEES + '/a1111111-b222-c333-d444-e55555555555',
        404,
      ));
  });
};
