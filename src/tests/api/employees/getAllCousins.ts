import { get } from '../../helpers';
import Redis from '../../../services/Redis';
import { PATH, EXISTING } from '../testsData';
import Employee from '../../../services/Employee';

export const getAllCousinsRequestTest = () => {
  describe("get employee's cousins request", () => {
    const fetchedEmployees = [
      {
        uuid: EXISTING.employees[5].uuid,
        name: EXISTING.employees[5].name,
        title: EXISTING.employees[5].title,
      },
      {
        uuid: EXISTING.employees[6].uuid,
        name: EXISTING.employees[6].name,
        title: EXISTING.employees[6].title,
      },
    ];

    it("should return 200 status with employee's cousins", async () => {
      const { statusCode, headers, body } = await get(
        PATH.EMPLOYEES + '/cousins/' + EXISTING.employees[3].uuid,
      );

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(fetchedEmployees);
    });

    it('should return cached employees', async () => {
      const stringifyParams = Employee.stringifyParams({
        uuid: EXISTING.employees[3].uuid,
        path: 'cousins',
        limit: 10,
      });

      const result = await Redis.get(Employee.REDIS_LIST_KEY + stringifyParams);

      expect(result).toStrictEqual(fetchedEmployees);
    });
  });
};
