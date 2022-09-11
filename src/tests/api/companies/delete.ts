import { PATH, EXISTING } from '../testsData';
import { destroy, testError } from '../../helpers';

export const deleteRequestTest = () => {
  describe('delete company request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(
        PATH.COMPANIES + '/' + EXISTING.companies[0].uuid,
      );

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    describe('when company uuid invalid', () => {
      testError(
        destroy,
        PATH.COMPANIES + '/a1111111-b222-c333-d444-e55555555555',
        404,
      );
    });
  });
};
