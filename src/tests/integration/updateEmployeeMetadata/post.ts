import { get, post } from './helpers';
import { PATH, POSTED } from './testsData';

export const postRequestTest = () => {
  describe('create a new document and update its manager metadata when posting employee', () => {
    it('should create a new document for the sent employee', async () => {
      const { statusCode, body } = await post(PATH.EMPLOYEES).send(
        POSTED.employee,
      );

      await new Promise(res =>
        setTimeout(
          () => res(console.log('waiting for rabbit to process the massages')),
          3000,
        ),
      );

      const { body: employeeMetadata } = await get(
        PATH.EMPLOYEES_METADATA + '/' + body.uuid,
      );

      expect(statusCode).toBe(201);
      expect(employeeMetadata?._id).toBe(body.uuid);
      expect(employeeMetadata?.subordinatesCount).toBe(0);
    });

    it("should increment employee's future manager's subordinatesCount by 1", async () => {
      const { body: futureManagerMetadata } = await get(
        PATH.EMPLOYEES_METADATA + '/' + POSTED.employee.managerUuid,
      );

      expect(futureManagerMetadata?.subordinatesCount).toBe(1);
    });
  });
};
