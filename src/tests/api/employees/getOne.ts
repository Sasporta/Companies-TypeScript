import Redis from '../../../modules/Redis';
import { PATH, EXISTING } from '../testsData';
import { get, testError } from '../../helpers';
import EmployeeModule from '../../../modules/Employee';

export const getOneRequestTest = () => {
  describe('get employee request', () => {
    it('should return 200 status with employee', async () => {
      const { statusCode, headers, body } = await get(
        PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: EXISTING.employees[0].uuid,
        name: EXISTING.employees[0].name,
        age: EXISTING.employees[0].age,
      });
    });

    it('should return cached employee', async () => {
      const result = await Redis.get(
        EmployeeModule.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
      );

      expect(result).toStrictEqual({
        ...EXISTING.employees[0],
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    describe('when employee uuid invalid', () =>
      testError(
        get,
        PATH.EMPLOYEES + '/a1111111-b222-c333-d444-e55555555555',
        404,
      ));
  });
};
