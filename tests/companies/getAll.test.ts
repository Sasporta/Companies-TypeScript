import { get } from '../helpers';
import { mockAllBasics } from '../__mocks__';
import { companiesPath, existingCompanies, mockCompany } from '../__mocks__/company';

describe('companies CRUD requests', () => {
  beforeAll(() => {
    mockAllBasics();
    mockCompany();
  });

  describe('get companies request', () => {
    it('should return 200 status with companies', async () => {
      const { statusCode, headers, body } = await get(companiesPath);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual([
        {
          uuid: existingCompanies[0].uuid,
          name: existingCompanies[0].name,
          country: existingCompanies[0].country,
        },
        {
          uuid: existingCompanies[1].uuid,
          name: existingCompanies[1].name,
          country: existingCompanies[1].country,
        },
        {
          uuid: existingCompanies[2].uuid,
          name: existingCompanies[2].name,
          country: existingCompanies[2].country,
        },
      ]);
    });
  });
});
