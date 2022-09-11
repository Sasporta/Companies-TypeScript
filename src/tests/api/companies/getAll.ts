import { get } from '../../helpers';
import { PATH, EXISTING } from '../testsData';

export const getAllRequestTest = () => {
  describe('get companies request', () => {
    it('should return 200 status with companies', async () => {
      const { statusCode, headers, body } = await get(
        PATH.COMPANIES + '?limit=' + 3,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(
        EXISTING.companies
          .slice(0, 3)
          .map(({ uuid, name, country }) => ({ uuid, name, country })),
      );
    });
  });
};
