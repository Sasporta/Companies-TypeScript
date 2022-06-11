import { Company } from '../../../entities/Company';
import { connectDb, disconnectDb } from '../../helpers';
import { deleteOrThrow404 } from '../../../controllers/helpers';
import { existingCompanies } from '../../api/__mocks__/companies/mockData';


describe('deleteOrThrow404 function', () => {
  beforeAll(async () => await connectDb());
  afterAll(async () => await disconnectDb());

  it('should not return anything is the call was successful', async () => {
    expect(await deleteOrThrow404(Company, existingCompanies[1].uuid)).toBe(undefined);
  });

  it('should throw a 404 error if an entity with that uuid was not found', async () => {
    const errorCatcher = async () => {
      try { return await deleteOrThrow404(Company, 'a1111111-b222-c333-d444-e55555555555'); }
      catch (error) { return error; }
    };

    expect(await errorCatcher()).toHaveProperty('status', 404);
  });
});