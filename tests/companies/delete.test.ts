import { mockAllBasics } from '../__mocks__';
import { destroy, testError } from '../helpers';
import { companiesPath, existingCompanies, mockCompany, mockCompanyNotFound } from '../__mocks__/company';

describe('companies CRUD requests', () => {
  beforeAll(() => {
    mockAllBasics();
    mockCompany();
  });

  describe('delete company request', () => {
    it('should return 204 status with no content', async () => {
      const { statusCode, body } = await destroy(companiesPath + '/' + existingCompanies[0].uuid);

      expect(statusCode).toBe(204);
      expect(body).toStrictEqual({});
    });

    describe('when company uuid invalid', () => {
      beforeEach(() => mockCompanyNotFound());

      testError(destroy, companiesPath + '/a1111111-b222-c333-d444-e55555555555', 404);
    });
  });
});
