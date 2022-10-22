import Redis from '../../../../services/Redis';
import Company from '../../../../services/Company';
import { BAD, PATH, EXISTING } from '../testsData';
import { destroy, testError } from '../../../helpers';

export const deleteRequestTest = () => {
  describe('delete company request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(
        PATH.COMPANIES + '/' + EXISTING.companies[0].uuid,
      );

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    it('should remove cached company', async () => {
      const result = await Redis.get(
        Company.REDIS_ITEM_KEY + EXISTING.companies[0].uuid,
      );

      expect(result).toStrictEqual(null);
    });

    it('should remove all cached companies lists', async () => {
      const result = await Redis.get(Company.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when company uuid invalid', () => {
      testError(destroy, PATH.COMPANIES + '/' + BAD.uuid, 404);
    });
  });
};
