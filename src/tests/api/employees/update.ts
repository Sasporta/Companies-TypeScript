import Redis from '../../../services/Redis';
import { patch, testError } from '../../helpers';
import EmployeeService from '../../../services/Employee';
import { BAD, PATH, EXISTING, UPDATED } from '../testsData';
import { EmployeeEntity } from '../../../entities/Employee';
import { EmployeePostgres } from '../../../services/Postgres';
import EmployeeMetadata from '../../../models/EmployeeMetadata';
import { EmployeeMetadataMongo } from '../../../services/Mongo';

export const updateRequestTest = () => {
  describe('update employee request', () => {
    describe('update employee title and check for cache invalidation', () => {
      it('should return 200 status with updated employee', async () => {
        const { statusCode, headers, body } = await patch(
          PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid,
        ).send(UPDATED.employee);

        expect(statusCode).toBe(200);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toStrictEqual({
          uuid: EXISTING.employees[0].uuid,
          name: EXISTING.employees[0].name,
          title: UPDATED.employee.title,
        });
      });

      it('should remove cached employee', async () => {
        const result = await Redis.get(
          EmployeeService.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
        );

        expect(result).toBe(null);
      });

      it('should remove all cached employees lists', async () => {
        const result = await Redis.get(EmployeeService.REDIS_LIST_KEY);

        expect(result).toBe(null);
      });
    });

    describe('update relevant employees metadata according to employees updates', () => {
      describe('promote employee to manager', () => {
        it("should update employee's manager id to null", async () => {
          await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[2].uuid).send(
            UPDATED.employeeToManager,
          );

          const employee = await EmployeePostgres.getOne(
            EXISTING.employees[2].uuid,
          );

          expect(employee?.manager_id).toBe(null);
        });

        it("should decrement employee's manager's subordinatesCount by 1", async () => {
          const employeeMetadataData = await EmployeeMetadataMongo.getOne(
            EXISTING.employeesMetadata[0]._id,
          );

          expect(employeeMetadataData?.subordinatesCount).toBe(1);
        });
      });

      describe('demote manager to employee', () => {
        it("should update employee's manager id to 1", async () => {
          await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[2].uuid).send(
            UPDATED.managerToEmployee,
          );

          const employee = await EmployeePostgres.getOne(
            EXISTING.employees[2].uuid,
          );

          expect(employee?.manager_id).toBe(1);
        });

        it("should increment employee's manager's subordinatesCount by 1", async () => {
          const employeeMetadataData = await EmployeeMetadataMongo.getOne(
            EXISTING.employeesMetadata[0]._id,
          );

          expect(employeeMetadataData?.subordinatesCount).toBe(2);
        });
      });

      describe("change employee's company and manager", () => {
        it("should update employee's company id and manager id", async () => {
          await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[3].uuid).send(
            UPDATED.employeeToDiffCompanyAndManager,
          );

          const updatedEmployee = await EmployeeEntity.findOneBy({
            uuid: EXISTING.employees[3].uuid,
          });

          expect(updatedEmployee?.company_id).toBe(EXISTING.companies[4].id);
          expect(updatedEmployee?.manager_id).toBe(EXISTING.employees[7].id);
        });

        it("should update employee's metadata's companyUuid", async () => {
          const company = await EmployeeMetadata.findOne(
            {
              _id: EXISTING.employeesMetadata[3]._id,
            },
            { companyUuid: true },
          );

          expect(company?.companyUuid).toBe(EXISTING.companies[4].uuid);
        });

        it("should decrement employee's manager's subordinatesCount by 1", async () => {
          const employeeMetadataData = await EmployeeMetadataMongo.getOne(
            EXISTING.employeesMetadata[1]._id,
          );

          expect(employeeMetadataData?.subordinatesCount).toBe(1);
        });

        it("should increment employee's new manager's subordinatesCount by 1", async () => {
          const employeeMetadataData = await EmployeeMetadataMongo.getOne(
            EXISTING.employeesMetadata[7]._id,
          );

          expect(employeeMetadataData?.subordinatesCount).toBe(1);
        });
      });
    });

    describe('when params missing', () =>
      testError(patch, PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid, 422));

    describe('when employee uuid invalid', () =>
      testError(patch, PATH.EMPLOYEES + '/' + BAD.uuid, 404, UPDATED.employee));

    describe('when company uuid invalid', () => {
      testError(patch, PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid, 422, {
        ...UPDATED.employee,
        companyUuid: BAD.uuid,
      });
    });

    describe('when manager uuid invalid', () => {
      testError(patch, PATH.EMPLOYEES + '/' + EXISTING.employees[0].uuid, 422, {
        ...UPDATED.employee,
        managerUuid: BAD.uuid,
      });
    });
  });
};
