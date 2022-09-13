import { get } from '../../helpers';
import { EXISTING, PATH } from '../testsData';

export const getAllRequestTest = () => {
  describe('get employeesMetadata request', () => {
    it('should return 200 status with all employees Metadata', async () => {
      const { statusCode, headers, body } = await get(PATH.EMPLOYEES_METADATA);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual(
        EXISTING.employeesMetadata.map(({ _id, subordinatesCount }) => ({
          _id,
          subordinatesCount,
        })),
      );
    });

    describe('when companyUuid param is given', () => {
      it('should return 200 status with employees Metadata of the given company only', async () => {
        const { statusCode, headers, body } = await get(
          PATH.EMPLOYEES_METADATA +
            '?companyUuid=' +
            EXISTING.companies[3].uuid,
        );

        expect(statusCode).toBe(200);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toStrictEqual(
          [
            EXISTING.employeesMetadata[0],
            EXISTING.employeesMetadata[1],
            EXISTING.employeesMetadata[2],
            EXISTING.employeesMetadata[3],
            EXISTING.employeesMetadata[4],
            EXISTING.employeesMetadata[5],
            EXISTING.employeesMetadata[6],
          ].map(({ _id, subordinatesCount }) => ({
            _id,
            subordinatesCount,
          })),
        );
      });
    });
  });
};
