import Redis from '../../../../services/Redis';
import { BAD, PATH, POSTED } from '../testsData';
import Rabbit from '../../../../services/rabbitMQ';
import { post, testError } from '../../../helpers';
import Employee from '../../../../services/Employee';

Rabbit.send = jest.fn();

export const postRequestTest = () => {
  describe('post employee request', () => {
    it('should return 201 status with new employee and send message to queue', async () => {
      const { statusCode, headers, body } = await post(PATH.EMPLOYEES).send(
        POSTED.employee,
      );

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: POSTED.employee.name,
        title: POSTED.employee.title,
      });
      expect(Rabbit.send).toHaveBeenCalledWith({
        action: 'create',
        employeeUuid: body.uuid,
        companyUuid: POSTED.employee.companyUuid,
        futureManagerUuid: POSTED.employee.managerUuid,
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
        title: POSTED.manager.title,
      });
    });

    it('should remove all cached employees lists', async () => {
      const result = await Redis.get(Employee.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when params missing', () => testError(post, PATH.EMPLOYEES, 422));

    describe('when company uuid invalid', () => {
      testError(post, PATH.EMPLOYEES, 422, {
        ...POSTED.employee,
        companyUuid: BAD.uuid,
      });
    });

    describe('when manager uuid invalid', () => {
      testError(post, PATH.EMPLOYEES, 422, {
        ...POSTED.employee,
        managerUuid: BAD.uuid,
      });
    });
  });
};
