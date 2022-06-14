import { patch, testError } from '../../helpers';
import { companiesPath, existingCompanies, updatedCompany } from '../__mocks__/entities/companiesData';

export const updateRequestTest = () => {
  describe('update company request', () => {
    it('should return 200 status with updated company', async () => {
      const { statusCode, headers, body } = await patch(companiesPath + '/' + existingCompanies[0].uuid).send(updatedCompany);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: existingCompanies[0].uuid,
        name: existingCompanies[0].name,
        country: updatedCompany.country,
      });
    });

    describe('when params missing', () =>
      testError(patch, companiesPath + '/' + existingCompanies[0].uuid, 422));

    describe('when company uuid invalid', () =>
      testError(patch, companiesPath + '/a1111111-b222-c333-d444-e55555555555', 404, updatedCompany));
  });
};
