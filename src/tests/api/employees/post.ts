import { PATH, POSTED } from '../testsData';
import { post, testError } from '../../helpers';
import Redis from '../../../services/Data/Redis';
import EmployeeService from '../../../services/businessLogic/Employee';
import { EmployeeMetadataDataManager } from '../../../services/Data/Mongo';

export const postRequestTest = () => {
  describe('post employee request', () => {
    it('should return 201 status with new employee and create new metadata document', async () => {
      const { statusCode, headers, body } = await post(PATH.EMPLOYEES).send(
        POSTED.employee,
      );

      const employeeMetadata = await EmployeeMetadataDataManager.getOne(
        body.uuid,
      );

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: POSTED.employee.name,
        title: POSTED.employee.title,
      });
      expect(employeeMetadata?._id).toStrictEqual(body.uuid);
      expect(employeeMetadata?.subordinatesCount).toStrictEqual(0);
    });

    it("should update new employee's manager metadata", async () => {
      const managerMetadata = await EmployeeMetadataDataManager.getOne(
        POSTED.employee.managerUuid,
      );

      expect(managerMetadata?.subordinatesCount).toBe(3);
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
      const result = await Redis.get(EmployeeService.REDIS_LIST_KEY);

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
