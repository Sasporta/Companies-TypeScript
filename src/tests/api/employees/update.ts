import Redis from '../../../modules/Redis';
import { patch, testError } from '../../helpers';
import EmployeeModule from '../../../modules/Employee';
import { PATH, EXISTING, UPDATED } from '../testsData';

export const updateRequestTest = () => {
  describe('update employee request', () => {
    it('should return 200 status with updated employee', async () => {
      const { statusCode, headers, body } = await patch(
        PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid,
      ).send(UPDATED.employee);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: EXISTING.employees[0].uuid,
        name: EXISTING.employees[0].name,
        age: UPDATED.employee.age,
      });
    });

    it('should return 200 status with updated manager', async () => {
      const { statusCode, headers, body } = await patch(
        PATH.EMPLOYEES + '/' + EXISTING.employees[2].uuid,
      ).send(UPDATED.employeeToManager);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: EXISTING.employees[2].uuid,
        name: EXISTING.employees[2].name,
        age: EXISTING.employees[2].age,
      });
    });

    it('should remove cached employee', async () => {
      const result = await Redis.get(
        EmployeeModule.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
      );

      expect(result).toStrictEqual(null);
    });

    it('should remove all cached employees lists', async () => {
      const result = await Redis.get(EmployeeModule.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when params missing', () =>
      testError(patch, PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid, 422));

    describe('when employee uuid invalid', () =>
      testError(
        patch,
        PATH.EMPLOYEES + '/a1111111-b222-c333-d444-e55555555555',
        404,
        UPDATED.employee,
      ));

    describe('when company uuid invalid', () => {
      testError(patch, PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid, 422, {
        ...UPDATED.employee,
        companyUuid: 'a1111111-b222-c333-d444-e55555555555',
      });
    });

    describe('when manager uuid invalid', () => {
      testError(patch, PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid, 422, {
        ...UPDATED.employee,
        managerUuid: 'a1111111-b222-c333-d444-e55555555555',
      });
    });
  });
};
