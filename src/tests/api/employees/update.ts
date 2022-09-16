import Redis from '../../../modules/Redis';
import { patch, testError } from '../../helpers';
import { Employee } from '../../../entities/Employee';
import EmployeeModule from '../../../modules/Employee';
import { PATH, EXISTING, UPDATED } from '../testsData';
import EmployeeMetadataModule from '../../../modules/EmployeeMetadata';
import EmployeeMetadata, {
  EmployeeMetadataDocument,
} from '../../../models/EmployeeMetadata';

export const updateRequestTest = () => {
  describe('update employee request', () => {
    describe('update employee age and check for cache invalidation', () => {
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

      it('should remove cached employee', async () => {
        const result = await Redis.get(
          EmployeeModule.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
        );

        expect(result).toBe(null);
      });

      it('should remove all cached employees lists', async () => {
        const result = await Redis.get(EmployeeModule.REDIS_LIST_KEY);

        expect(result).toBe(null);
      });
    });
    describe('update relevant employees metadata according to employees updates', () => {
      describe('promote employee to manager', () => {
        it("should update employee's manager id to null", async () => {
          await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[2].uuid).send(
            UPDATED.employeeToManager,
          );

          const { manager_id } = await EmployeeModule.getOne(
            EXISTING.employees[2].uuid,
            404,
          );

          expect(manager_id).toBe(null);
        });

        it("should decrement employee's manager's subordinatesCount by 1", async () => {
          const { subordinatesCount } = (await EmployeeMetadataModule.getOne(
            EXISTING.employeesMetadata[0]._id,
          )) as EmployeeMetadataDocument;

          expect(subordinatesCount).toBe(1);
        });
      });

      describe('demote manager to employee', () => {
        it("should update employee's manager id to 1", async () => {
          await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[2].uuid).send(
            UPDATED.managerToEmployee,
          );

          const { manager_id } = await EmployeeModule.getOne(
            EXISTING.employees[2].uuid,
            404,
          );

          expect(manager_id).toBe(1);
        });

        it("should increment employee's manager's subordinatesCount by 1", async () => {
          const { subordinatesCount } = (await EmployeeMetadataModule.getOne(
            EXISTING.employeesMetadata[0]._id,
          )) as EmployeeMetadataDocument;

          expect(subordinatesCount).toBe(2);
        });
      });

      describe("change employee's company and manager", () => {
        it("should update employee's company id and manager id", async () => {
          await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[3].uuid).send(
            UPDATED.employeeToDiffCompanyAndManager,
          );

          const updatedEmployee = await Employee.findOneBy({
            uuid: EXISTING.employees[3].uuid,
          });

          expect(updatedEmployee?.company_id).toStrictEqual(
            EXISTING.companies[4].id,
          );
          expect(updatedEmployee?.manager_id).toStrictEqual(
            EXISTING.employees[7].id,
          );
        });

        it("should update employee's metadata's companyUuid", async () => {
          const company = await EmployeeMetadata.findOne(
            {
              _id: EXISTING.employeesMetadata[3]._id,
            },
            { companyUuid: true },
          );

          expect(company?.companyUuid).toStrictEqual(
            EXISTING.companies[4].uuid,
          );
        });

        it("should decrement employee's manager's subordinatesCount by 1", async () => {
          const { subordinatesCount } = (await EmployeeMetadataModule.getOne(
            EXISTING.employeesMetadata[1]._id,
          )) as EmployeeMetadataDocument;

          expect(subordinatesCount).toStrictEqual(1);
        });

        it("should increment employee's new manager's subordinatesCount by 1", async () => {
          const { subordinatesCount } = (await EmployeeMetadataModule.getOne(
            EXISTING.employeesMetadata[7]._id,
          )) as EmployeeMetadataDocument;

          expect(subordinatesCount).toStrictEqual(1);
        });
      });
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
