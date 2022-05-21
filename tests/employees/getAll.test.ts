import { get } from '../helpers';
import { mockAllBasics } from '../__mocks__';
import { employeesPath, existingEmployees, mockEmployee } from '../__mocks__/employee';

describe('employees CRUD requests', () => {
  beforeAll(() => {
    mockAllBasics();
    mockEmployee();
  });

  describe('get employees request', () => {
    it('should return 200 status with employees', async () => {
      const { statusCode, headers, body } = await get(employeesPath);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual([
        {
          uuid: existingEmployees[0].uuid,
          name: existingEmployees[0].name,
          age: existingEmployees[0].age,
        },
        {
          uuid: existingEmployees[1].uuid,
          name: existingEmployees[1].name,
          age: existingEmployees[1].age,
        },
        {
          uuid: existingEmployees[2].uuid,
          name: existingEmployees[2].name,
          age: existingEmployees[2].age,
        },
      ]);
    });
  });
});
