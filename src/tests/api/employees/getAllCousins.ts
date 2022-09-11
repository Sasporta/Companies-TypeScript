import { get } from '../../helpers';
import { PATH, EXISTING } from '../testsData';

export const getAllCousinsRequestTest = () => {
  describe('get employee\'s cousins request', () => {
    it('should return 200 status with employee\'s cousins', async () => {
      const { statusCode, headers, body } = await get(
        PATH.EMPLOYEES + '/cousins/' + EXISTING.employees[3].uuid,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual([
        {
          uuid: EXISTING.employees[5].uuid,
          name: EXISTING.employees[5].name,
          age: EXISTING.employees[5].age,
        },
        {
          uuid: EXISTING.employees[6].uuid,
          name: EXISTING.employees[6].name,
          age: EXISTING.employees[6].age,
        },
      ]);
    });
  });
};
