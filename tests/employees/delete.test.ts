import { destroy, testError } from '../helpers';
import { mockAllBasics } from '../__mocks__';
import { employeesPath, existingEmployees, mockEmployee, mockEmployeeNotFound } from '../__mocks__/employee';

describe('employees CRUD requests', () => {
  beforeAll(() => {
    mockAllBasics();
    mockEmployee();
  });

  describe('delete employee request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(employeesPath + '/' + existingEmployees[0].uuid);

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    describe('when employee uuid invalid', () => {
      beforeEach(() => mockEmployeeNotFound());

      testError(destroy, employeesPath + '/a1111111-b222-c333-d444-e55555555555', 404);
    });
  });
});
