import { get, testError } from '../../helpers';
import { companiesPath, existingCompanies } from '../__mocks__/entities/companiesData';

export const getOneRequestTest = () => {
  describe('get company request', () => {
    it('should return 200 status with company', async () => {
      const { statusCode, headers, body } = await get(companiesPath + '/' + existingCompanies[0].uuid);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: existingCompanies[0].uuid,
        name: existingCompanies[0].name,
        country: existingCompanies[0].country,
      });
    });

    describe('when company uuid invalid', () =>
      testError(get, companiesPath + '/a1111111-b222-c333-d444-e55555555555', 404));
  });
}
