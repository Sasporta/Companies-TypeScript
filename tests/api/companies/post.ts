import { post, testError } from '../../helpers';
import { companiesPath, postedCompany } from '../__mocks__/companies/mockData';

export const postRequestTest = () => {
  describe('post company request', () => {
    it('should return 201 status with new company', async () => {
      const { statusCode, headers, body } = await post(companiesPath).send(postedCompany);

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: postedCompany.name,
        country: postedCompany.country,
      });
    });

    describe('when params invalid or missing', () =>
      testError(post, companiesPath, 422));
  });
};
