import Redis from '../../../../services/Redis';
import Rabbit from '../../../../services/rabbitMQ';
import { patch, testError } from '../../../helpers';
import Employee from '../../../../services/Employee';
import { BAD, PATH, EXISTING, UPDATED } from '../testsData';
import { EmployeeEntity } from '../../../../entities/Employee';
import { EmployeePostgres } from '../../../../services/Postgres';

Rabbit.send = jest.fn();

export const updateRequestTest = () => {
  describe('update employee request', () => {
    describe('update employee title and check for cache invalidation', () => {
      it('should return 200 status with updated employee and not send message to queue', async () => {
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
        expect(Rabbit.send).toHaveBeenCalledTimes(0);
      });

      it('should remove cached employee', async () => {
        const result = await Redis.get(
          Employee.REDIS_ITEM_KEY + EXISTING.employees[0].uuid,
        );

        expect(result).toBe(null);
      });

      it('should remove all cached employees lists', async () => {
        const result = await Redis.get(Employee.REDIS_LIST_KEY);

        expect(result).toBe(null);
      });
    });

    describe('promote employee to manager', () => {
      it("should update employee's manager id to null and send message to queue", async () => {
        await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[2].uuid).send(
          UPDATED.employeeToManager,
        );

        const employee = await EmployeePostgres.getOne(
          EXISTING.employees[2].uuid,
        );

        expect(employee?.manager_id).toBe(null);
        expect(Rabbit.send).toHaveBeenCalledWith({
          action: 'update',
          employeeUuid: EXISTING.employees[2].uuid,
          companyUuid: undefined,
          futureManagerUuid: UPDATED.employeeToManager.managerUuid,
          previousManagerUuid: EXISTING.employees[0].uuid,
        });
      });
    });

    describe("change employee's company and manager", () => {
      it("should update employee's company id and manager id and send message to queue", async () => {
        await patch(PATH.EMPLOYEES + '/' + EXISTING.employees[3].uuid).send(
          UPDATED.employeeToDiffCompanyAndManager,
        );

        const updatedEmployee = await EmployeeEntity.findOneBy({
          uuid: EXISTING.employees[3].uuid,
        });

        expect(updatedEmployee?.company_id).toBe(EXISTING.companies[4].id);
        expect(updatedEmployee?.manager_id).toBe(EXISTING.employees[7].id);
        expect(Rabbit.send).toHaveBeenCalledWith({
          action: 'update',
          employeeUuid: EXISTING.employees[3].uuid,
          companyUuid: UPDATED.employeeToDiffCompanyAndManager.companyUuid,
          futureManagerUuid:
            UPDATED.employeeToDiffCompanyAndManager.managerUuid,
          previousManagerUuid: EXISTING.employees[1].uuid,
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
