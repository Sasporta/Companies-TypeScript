import { MESSAGE } from './testsData';
import Metadata from '../../../../services/Metadata';
import EmployeeMetadata from '../../../../models/EmployeeMetadata';
import Mongo, { EmployeeMetadataMongo } from '../../../../services/Mongo';

describe('Metadata App', () => {
  beforeAll(async () => await Mongo.connect());

  afterAll(async () => await Mongo.disconnect());

  describe('updateCounts method', () => {
    describe('update the employee and its previous and future manager metadata', () => {
      it("should update employee's metadata's companyUuid", async () => {
        await Metadata.updateCounts(MESSAGE.update);

        const employeeMetadata = await EmployeeMetadata.findOne(
          {
            _id: MESSAGE.update.employeeUuid,
          },
          { companyUuid: true },
        );

        expect(employeeMetadata?.companyUuid).toBe(MESSAGE.update.companyUuid);
      });

      it("should decrement employee's previous manager's subordinatesCount by 1", async () => {
        const previousManagerMetadata = await EmployeeMetadataMongo.getOne(
          MESSAGE.update.previousManagerUuid,
        );

        expect(previousManagerMetadata?.subordinatesCount).toBe(0);
      });

      it("should increment employee's future manager's subordinatesCount by 1", async () => {
        const futureManagerMetadata = await EmployeeMetadataMongo.getOne(
          MESSAGE.update.futureManagerUuid,
        );

        expect(futureManagerMetadata?.subordinatesCount).toBe(1);
      });
    });
  });

  describe('createCount method', () => {
    describe('create a new document and update its manager metadata', () => {
      it('should create a new document for the sent employee', async () => {
        await Metadata.createCount(MESSAGE.create);

        const employeeMetadata = await EmployeeMetadataMongo.getOne(
          MESSAGE.create.employeeUuid,
        );

        expect(employeeMetadata?._id).toBe(MESSAGE.create.employeeUuid);
        expect(employeeMetadata?.subordinatesCount).toBe(0);
      });

      it("should increment employee's future manager's subordinatesCount by 1", async () => {
        const futureManagerMetadata = await EmployeeMetadataMongo.getOne(
          MESSAGE.create.futureManagerUuid,
        );

        expect(futureManagerMetadata?.subordinatesCount).toBe(2);
      });
    });
  });

  describe('deleteCount method', () => {
    describe("delete employee's metadata - it doesn't have a manager so there's nothing to update", () => {
      it("should delete employee's metadata document", async () => {
        await Metadata.deleteCount(MESSAGE.delete);

        const employeeMetadata = await EmployeeMetadata.findOne({
          _id: MESSAGE.delete.employeeUuid,
        });

        expect(employeeMetadata).toBe(null);
      });
    });
  });
});
