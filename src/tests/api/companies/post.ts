import { PATH, POSTED } from '../testsData';
import { post, testError } from '../../helpers';

export const postRequestTest = () => {
  describe('post company request', () => {
    it('should return 201 status with new company', async () => {
      const { statusCode, headers, body } = await post(PATH.COMPANIES).send(
        POSTED.company,
      );

      expect(statusCode).toBe(201);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toStrictEqual({
        uuid: expect.any(String),
        name: POSTED.company.name,
        country: POSTED.company.country,
      });
    });

    describe('when params invalid or missing', () =>
      testError(post, PATH.COMPANIES, 422));
  });
};
