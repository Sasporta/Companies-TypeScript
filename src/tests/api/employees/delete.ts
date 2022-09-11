import { PATH, EXISTING } from '../testsData';
import { destroy, testError } from '../../helpers';

export const deleteRequestTest = () => {
  describe('delete employee request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(
        PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid,
      );

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    describe('when employee uuid invalid', () =>
      testError(
        destroy,
        PATH.EMPLOYEES + '/a1111111-b222-c333-d444-e55555555555',
        404,
      ));
  });
};
