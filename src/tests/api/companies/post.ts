import { PATH, POSTED } from '../testsData';
import { post, testError } from '../../helpers';
import Redis from '../../../services/Data/Redis';
import CompanyService from '../../../services/businessLogic/Company';

export const postRequestTest = () => {
  describe('post company request', () => {
    it('should return 201 status with new company', async () => {
      const { statusCode, headers, body } = await post(PATH.COMPANIES).send(
        POSTED.company,
      );

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: POSTED.company.name,
        country: POSTED.company.country,
      });
    });

    it('should remove all cached companies lists', async () => {
      const result = await Redis.get(CompanyService.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when params invalid or missing', () =>
      testError(post, PATH.COMPANIES, 422));
  });
};
