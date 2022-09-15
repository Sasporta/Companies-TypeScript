import Redis from '../../../modules/Redis';
import { PATH, EXISTING } from '../testsData';
import { get, testError } from '../../helpers';
import CompanyModule from '../../../modules/Company';

export const getOneRequestTest = () => {
  describe('get company request', () => {
    it('should return 200 status with company', async () => {
      const { statusCode, headers, body } = await get(
        PATH.COMPANIES + '/' + EXISTING.companies[0].uuid,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: EXISTING.companies[0].uuid,
        name: EXISTING.companies[0].name,
        country: EXISTING.companies[0].country,
      });
    });

    it('should return cached company', async () => {
      const result = await Redis.get(
        CompanyModule.REDIS_ITEM_KEY + EXISTING.companies[0].uuid,
      );

      expect(result).toStrictEqual({
        ...EXISTING.companies[0],
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    describe('when company uuid invalid', () =>
      testError(
        get,
        PATH.COMPANIES + '/a1111111-b222-c333-d444-e55555555555',
        404,
      ));
  });
};
