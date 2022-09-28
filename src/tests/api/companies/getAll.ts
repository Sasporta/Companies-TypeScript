import { get } from '../../helpers';
import { PATH, EXISTING } from '../testsData';
import Redis from '../../../services/Data/Redis';
import CompanyService from '../../../services/businessLogic/Company';

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
      const result = await Redis.get(CompanyService.REDIS_LIST_KEY + 3);

      expect(result).toStrictEqual(fetchedCompanies);
    });
  });
};
