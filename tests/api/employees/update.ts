import { patch, testError } from '../../helpers';
import { employeesPath, existingEmployees, updatedEmployee } from '../__mocks__/employee';

export const updateRequestTest = () => {
  describe('update employee request', () => {
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

    describe('when params missing', () =>
      testError(patch, employeesPath + '/' + existingEmployees[0].uuid, 422));

    describe('when employee uuid invalid', () =>
      testError(patch, employeesPath + '/a1111111-b222-c333-d444-e55555555555', 404, updatedEmployee));

    describe('when company uuid invalid', () => {
      testError(patch, employeesPath + '/' + existingEmployees[0].uuid, 422, {
        ...updatedEmployee,
        companyUuid: '/a1111111-b222-c333-d444-e55555555555',
      });
    });

    describe('when manager uuid invalid', () => {
      testError(patch, employeesPath + '/' + existingEmployees[0].uuid, 422, {
        ...updatedEmployee,
        managerUuid: '/a1111111-b222-c333-d444-e55555555555',
      });
    });
  });
};
