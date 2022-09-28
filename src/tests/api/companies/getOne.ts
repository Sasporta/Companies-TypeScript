import { get, testError } from '../../helpers';
import Redis from '../../../services/Data/Redis';
import { BAD, PATH, EXISTING } from '../testsData';
import CompanyService from '../../../services/businessLogic/Company';

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
        CompanyService.REDIS_ITEM_KEY + EXISTING.companies[0].uuid,
      );

      expect(result).toStrictEqual({
        ...EXISTING.companies[0],
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    describe('when company uuid invalid', () =>
      testError(get, PATH.COMPANIES + '/' + BAD.uuid, 404));
  });
};
