import Redis from '../../../../services/Redis';
import Rabbit from '../../../../services/rabbitMQ';
import { BAD, PATH, EXISTING } from '../testsData';
import Employee from '../../../../services/Employee';
import { destroy, testError } from '../../../helpers';

Rabbit.send = jest.fn();

export const deleteRequestTest = () => {
  describe('delete employee request', () => {
    it('should return 204 status with no content and send message to queue', async () => {
      const { statusCode, body } = await destroy(
        PATH.EMPLOYEES + '/' + EXISTING.employees[1].uuid,
      );

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
      expect(Rabbit.send).toHaveBeenCalledWith({
        action: 'delete',
        employeeUuid: EXISTING.employees[1].uuid,
        previousManagerUuid: EXISTING.employees[0].uuid,
      });
    });

    it('should remove cached employee', async () => {
      const result = await Redis.get(
        Employee.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
      );

      expect(result).toStrictEqual(null);
    });

    it('should remove all cached employees lists', async () => {
      const result = await Redis.get(Employee.REDIS_LIST_KEY);

      expect(result).toStrictEqual(null);
    });

    describe('when employee uuid invalid', () =>
      testError(destroy, PATH.EMPLOYEES + '/' + BAD.uuid, 404));
  });
};
