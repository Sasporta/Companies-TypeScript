import { post, testError } from '../../helpers';
import { mockCompanyNotFound } from '../__mocks__/company';
import { employeesPath, mockEmployeeNotFound, postedEmployee } from '../__mocks__/employee';

export const postRequestTest = () => {
  describe('post employee request', () => {
    it('should return 201 status with new employee', async () => {
      const { statusCode, headers, body } = await post(employeesPath).send(postedEmployee);

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
          uuid: expect.any(String),
          name: postedEmployee.name,
          age: postedEmployee.age,
        }
      );
    });

    describe('when params missing', () => {
      testError(post, employeesPath, 422);
    });

    describe('when company uuid invalid', () => {
      beforeEach(() => mockCompanyNotFound());

      testError(post, employeesPath, 422, postedEmployee);
    });

    describe('when manager uuid invalid', () => {
      beforeEach(() => mockEmployeeNotFound());

      testError(post, employeesPath, 422, postedEmployee);
    });
  });
};
