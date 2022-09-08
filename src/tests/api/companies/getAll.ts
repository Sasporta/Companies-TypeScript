import { get } from '../../helpers';
import { companiesPath, existingCompanies } from '../companiesData';

export const getAllRequestTest = () => {
  describe('get companies request', () => {
    it('should return 200 status with companies', async () => {
      const { statusCode, headers, body } = await get(
        companiesPath + '?limit=' + 3,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(
        existingCompanies
          .slice(0, 3)
          .map(({ uuid, name, country }) => ({ uuid, name, country })),
      );
    });
  });
};
