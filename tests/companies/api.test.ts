import { get, post, patch, destroy, testError } from '../helpers';

const basePath = '/companies';

describe('companies CRUD requests', () => {
  describe.only('get companies request', () => {
    it.only('should return 200 status with companies', async () => {
      const { statusCode, headers, body } = await get(basePath);

      expect(statusCode).toBe(200);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toBe([]);
    });
  });

  describe('post company request', () => {
    it('should return 201 status with new company', async () => {

    });

    describe('when params invalid', () => {
      it(`should return 422 status with proper error message`, async () => {

      });
    });
  });

  describe('get company request', () => {
    it('should return 200 status with company', async () => {

    });

    describe('when params invalid', () => {
      it('should return 404 status with proper error message', async () => {

      });
    });
  });

  describe('update company request', () => {
    it('should return 204 status with updated company', async () => {

    });

    describe('when params invalid', () => {
      it('should return 404 status with proper error message', async () => {

      });

      it(`should return 422 status with proper error message`, async () => {

      });
    });
  });

  describe('delete company request', () => {
    it('should return 204 status with no content', async () => {

    });

    describe('when params invalid', () => {
      it('should return 404 status with proper error message', async () => {

      });
    });
  });
});
