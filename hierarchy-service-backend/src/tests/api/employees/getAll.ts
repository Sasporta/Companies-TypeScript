import { get } from '../../helpers';
import { PATH, EXISTING } from '../testsData';
import Redis from '../../../services/Data/Redis';
import EmployeeService from '../../../services/businessLogic/Employee';

export const getAllRequestTest = () => {
  describe('get employees request', () => {
    const fetchedEmployees = EXISTING.employees.map(
      ({ uuid, name, title }) => ({
        uuid,
        name,
        title,
      }),
    );

    it('should return 200 status with employees', async () => {
      const { statusCode, headers, body } = await get(PATH.EMPLOYEES);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(fetchedEmployees);
    });

    it('should return cached employees', async () => {
      const result = await Redis.get(
        EmployeeService.REDIS_LIST_KEY + '?limit:10',
      );

      expect(result).toStrictEqual(fetchedEmployees);
    });

    describe('when companyUuid param is given', () => {
      it('should return 200 status with employees of the given company only', async () => {
        const { statusCode, headers, body } = await get(
          PATH.EMPLOYEES + '?companyUuid=' + EXISTING.companies[3].uuid,
        );

        expect(statusCode).toBe(200);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toStrictEqual(
          [
            EXISTING.employees[0],
            EXISTING.employees[1],
            EXISTING.employees[2],
            EXISTING.employees[3],
            EXISTING.employees[4],
            EXISTING.employees[5],
            EXISTING.employees[6],
          ].map(({ uuid, name, title }) => ({ uuid, name, title })),
        );
      });
    });

    describe('when managerUuid param is given', () => {
      it('should return 200 status with employees of the given manager only', async () => {
        const { statusCode, headers, body } = await get(
          PATH.EMPLOYEES + '?managerUuid=' + EXISTING.employees[0].uuid,
        );

        expect(statusCode).toBe(200);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toStrictEqual([
          {
            uuid: EXISTING.employees[1].uuid,
            name: EXISTING.employees[1].name,
            title: EXISTING.employees[1].title,
          },
          {
            uuid: EXISTING.employees[2].uuid,
            name: EXISTING.employees[2].name,
            title: EXISTING.employees[2].title,
          },
        ]);
      });
    });

    describe('when companyUuid and managerUuid params are given', () => {
      it('should return 200 status with employees of the given company and manager only', async () => {
        const { statusCode, headers, body } = await get(
          PATH.EMPLOYEES +
            '?companyUuid=' +
            EXISTING.companies[3].uuid +
            '&managerUuid=' +
            EXISTING.employees[0].uuid,
        );

        expect(statusCode).toBe(200);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toStrictEqual([
          {
            uuid: EXISTING.employees[1].uuid,
            name: EXISTING.employees[1].name,
            title: EXISTING.employees[1].title,
          },
          {
            uuid: EXISTING.employees[2].uuid,
            name: EXISTING.employees[2].name,
            title: EXISTING.employees[2].title,
          },
        ]);
      });
    });
  });
};
