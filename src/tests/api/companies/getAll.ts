import { get } from '../../helpers';
import Redis from '../../../services/Redis';
import { PATH, EXISTING } from '../testsData';
import Company from '../../../services/Company';

export const getAllRequestTest = () => {
  describe('get companies request', () => {
    const fetchedCompanies = EXISTING.companies
      .slice(0, 3)
      .map(({ uuid, name, country }) => ({ uuid, name, country }));

    it('should return 200 status with companies', async () => {
      const { statusCode, headers, body } = await get(
        PATH.COMPANIES + '?limit=' + 3,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(fetchedCompanies);
    });

    it('should return cached companies', async () => {
      const result = await Redis.get(Company.REDIS_LIST_KEY + 3);

      expect(result).toStrictEqual(fetchedCompanies);
    });
  });
};
