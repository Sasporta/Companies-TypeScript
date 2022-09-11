import { patch, testError } from '../../helpers';
import { PATH, EXISTING, UPDATED } from '../testsData';

export const updateRequestTest = () => {
  describe('update company request', () => {
    it('should return 200 status with updated company', async () => {
      const { statusCode, headers, body } = await patch(
        PATH.COMPANIES + '/' + EXISTING.companies[0].uuid,
      ).send(UPDATED.company);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: EXISTING.companies[0].uuid,
        name: EXISTING.companies[0].name,
        country: UPDATED.company.country,
      });
    });

    describe('when params missing', () =>
      testError(patch, PATH.COMPANIES + '/' + EXISTING.companies[0].uuid, 422));

    describe('when company uuid invalid', () =>
      testError(
        patch,
        PATH.COMPANIES + '/a1111111-b222-c333-d444-e55555555555',
        404,
        UPDATED.company,
      ));
  });
};
