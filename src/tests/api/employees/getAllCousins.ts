import { get } from '../../helpers';
import { employeesPath, existingEmployees } from '../employeesData';

export const getAllCousinsRequestTest = () => {
  describe("get employee's cousins request", () => {
    it("should return 200 status with employee's cousins", async () => {
      const { statusCode, headers, body } =
        await get(employeesPath + '/cousins/' + existingEmployees[3].uuid);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual([
        {
          uuid: existingEmployees[5].uuid,
          name: existingEmployees[5].name,
          age: existingEmployees[5].age,
        },
        {
          uuid: existingEmployees[6].uuid,
          name: existingEmployees[6].name,
          age: existingEmployees[6].age,
        },
      ]);
    });
  });
};