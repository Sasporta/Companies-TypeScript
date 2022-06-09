import { Company } from '../../../entities/Company';
import { mockAllBasics } from '../../api/__mocks__';
import { cleanupDb, setupMockOrDb } from '../../helpers';
import { findOrThrow } from '../../../controllers/helpers';
import { existingCompanies, mockCompany } from '../../api/__mocks__/company';


describe('findOrThrow function', () => {
  beforeAll(() => setupMockOrDb([mockAllBasics, mockCompany]));
  
  afterAll(() => cleanupDb());

  it('should return the found entity if the returned value is different then null or undefined', async () => {
    expect(await findOrThrow(Company, existingCompanies[0].uuid, 404)).toMatchObject({ ...existingCompanies[0] });
  });

  it('should throw an error if the returned value is null or undefined', async () => {
    const errorCatcher = async () => {
      try { return await findOrThrow(Company, 'a1111111-b222-c333-d444-e55555555555', 404); }
      catch (error) { return error; }
    };

    expect(await errorCatcher()).toHaveProperty('status', 404);
  });
});
