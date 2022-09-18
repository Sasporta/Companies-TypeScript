import { PATH, EXISTING } from '../testsData';
import Redis from '../../../services/Data/Redis';
import { destroy, testError } from '../../helpers';
import CompanyService from '../../../services/businessLogic/Company';

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
        CompanyService.REDIS_ITEM_KEY + EXISTING.companies[0].uuid,
      );

      expect(result).toStrictEqual(null);
    });

    it('should remove all cached companies lists', async () => {
      const result = await Redis.get(CompanyService.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
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
