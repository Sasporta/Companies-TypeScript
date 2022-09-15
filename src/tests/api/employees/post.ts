import Redis from '../../../modules/Redis';
import { PATH, POSTED } from '../testsData';
import { post, testError } from '../../helpers';
import EmployeeModule from '../../../modules/Employee';

export const postRequestTest = () => {
  describe('post employee request', () => {
    it('should return 201 status with new employee', async () => {
      const { statusCode, headers, body } = await post(PATH.EMPLOYEES).send(
        POSTED.employee,
      );

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: POSTED.employee.name,
        age: POSTED.employee.age,
      });
    });

    it('should return 201 status with new manager', async () => {
      const { statusCode, headers, body } = await post(PATH.EMPLOYEES).send(
        POSTED.manager,
      );

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: POSTED.manager.name,
        age: POSTED.manager.age,
      });
    });

    it('should remove all cached employees lists', async () => {
      const result = await Redis.get(EmployeeModule.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when params missing', () => testError(post, PATH.EMPLOYEES, 422));

    describe('when company uuid invalid', () => {
      testError(post, PATH.EMPLOYEES, 422, {
        ...POSTED.employee,
        companyUuid: 'a1111111-b222-c333-d444-e55555555555',
      });
    });

    describe('when manager uuid invalid', () => {
      testError(post, PATH.EMPLOYEES, 422, {
        ...POSTED.employee,
        managerUuid: 'a1111111-b222-c333-d444-e55555555555',
      });
    });
  });
};
