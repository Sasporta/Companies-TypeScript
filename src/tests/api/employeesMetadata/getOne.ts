import { EXISTING, PATH } from '../testsData';
import { get, testError } from '../../helpers';

export const getOneRequestTest = () => {
  describe('get employee request', () => {
    it('should return 200 status with chosen employee metadata', async () => {
      const { statusCode, headers, body } = await get(
        PATH.EMPLOYEES + '/' + EXISTING.employeesMetadata[0].employeeUuid,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: EXISTING.employeesMetadata[0].employeeUuid,
        name: EXISTING.employeesMetadata[0].subordinatesCount,
      });
    });

    describe('when employee uuid invalid', () =>
      testError(
        get,
        PATH.EMPLOYEES_METADATA + '/a1111111-b222-c333-d444-e55555555555',
        404,
      ));
  });
};
