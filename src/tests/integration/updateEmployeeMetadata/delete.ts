import { destroy, get } from './helpers';
import { PATH, testEmployeesUuids } from './testsData';

export const deleteRequestTest = () => {
  describe("delete employee's metadata and update its manager metadata", () => {
    it("should delete employee's metadata", async () => {
      const { statusCode: deleteStatus } = await destroy(
        PATH.EMPLOYEES + '/' + testEmployeesUuids[1],
      );

      await new Promise(res =>
        setTimeout(
          () => res(console.log('waiting for rabbit to process the massages')),
          3000,
        ),
      );

      const { statusCode: getStatus } = await get(
        PATH.EMPLOYEES_METADATA + '/' + testEmployeesUuids[1],
      );

      expect(deleteStatus).toBe(204);
      expect(getStatus).toBe(404);
    });

    it("should decrement employee's previous manager's subordinatesCount by 1", async () => {
      const { body: previousManagerMetadata } = await get(
        PATH.EMPLOYEES_METADATA + '/' + testEmployeesUuids[2],
      );

      expect(previousManagerMetadata?.subordinatesCount).toBe(0);
    });
  });
};
