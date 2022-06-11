import { get } from '../../helpers';
import { companiesPath, existingCompanies } from '../__mocks__/companies/mockData';

export const getAllRequestTest = () => {
  describe('get companies request', () => {
    it('should return 200 status with companies', async () => {
      const { statusCode, headers, body } = await get(companiesPath);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(existingCompanies.map(({ uuid, name, country }) => ({ uuid, name, country })));
    });
  });
};
