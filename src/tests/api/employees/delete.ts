import Redis from '../../../modules/Redis';
import { PATH, EXISTING } from '../testsData';
import { destroy, testError } from '../../helpers';
import EmployeeModule from '../../../modules/Employee';


export const deleteRequestTest = () => {
  describe('delete employee request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(
        PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid,
      );

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    it('should remove cached employee', async () => {
      const result = await Redis.get(
        EmployeeModule.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
      );

      expect(result).toStrictEqual(null);
    });

    it('should remove all cached employees lists', async () => {
      const result = await Redis.get(EmployeeModule.REDIS_LIST_KEY);

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
