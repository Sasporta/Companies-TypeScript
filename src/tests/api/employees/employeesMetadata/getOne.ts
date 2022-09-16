import { EXISTING, PATH } from '../../testsData';
import { get, testError } from '../../../helpers';

export const getOneMetadataRequestTest = () => {
  describe('get employeeMetadata request', () => {
    it('should return 200 status with chosen employee metadata', async () => {
      const { statusCode, headers, body } = await get(
        PATH.EMPLOYEES_METADATA + '/' + EXISTING.employeesMetadata[0]._id,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        _id: EXISTING.employeesMetadata[0]._id,
        subordinatesCount: EXISTING.employeesMetadata[0].subordinatesCount,
      });
    });

    describe('when employeeUuid invalid', () =>
      testError(
        get,
        PATH.EMPLOYEES_METADATA + '/a1111111-b222-c333-d444-e55555555555',
        404,
      ));
  });
};
