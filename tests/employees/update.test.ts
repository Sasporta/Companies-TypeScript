import { mockAllBasics } from '../__mocks__';
import { patch, testError } from '../helpers';
import { mockCompany, mockCompanyNotFound } from '../__mocks__/company';
import { employeesPath, existingEmployees, mockEmployee, mockEmployeeNotFound, mockEmployeeNotFoundOnSecondTime, mockToJsonUpdatedEmployee, updatedEmployee } from '../__mocks__/employee';

describe('employees CRUD requests', () => {
  beforeAll(() => {
    mockAllBasics();
    mockCompany();
    mockEmployee();
  });

  describe('update employee request', () => {
    beforeEach(() => mockToJsonUpdatedEmployee());

    it('should return 200 status with updated employee', async () => {
      const { statusCode, headers, body } = await patch(employeesPath + '/' + existingEmployees[0].uuid).send(updatedEmployee);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: existingEmployees[0].uuid,
        name: existingEmployees[0].name,
        age: updatedEmployee.age,
      });
    });

    describe('when params missing', () => {
      testError(patch, employeesPath + '/' + existingEmployees[0].uuid, 422);
    });

    describe('when employee uuid invalid', () => {
      beforeEach(() => mockEmployeeNotFound());

      testError(patch, employeesPath + '/a1111111-b222-c333-d444-e55555555555', 404, updatedEmployee);
    });

    describe('when company uuid invalid', () => {
      beforeEach(() => mockCompanyNotFound());

      testError(patch, employeesPath + '/' + existingEmployees[0].uuid, 422, {
        ...updatedEmployee,
        companyUuid: '/a1111111-b222-c333-d444-e55555555555',
      });
    });

    describe('when manager uuid invalid', () => {
      beforeEach(() => mockEmployeeNotFoundOnSecondTime());

      testError(patch, employeesPath + '/' + existingEmployees[0].uuid, 422, {
        ...updatedEmployee,
        managerUuid: '/a1111111-b222-c333-d444-e55555555555',
      });
    });
  });
});
