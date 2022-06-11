import { Company } from '../../../entities/Company';
import { connectDb, disconnectDb } from '../../helpers';
import { updateOrThrow404 } from '../../../controllers/helpers';
import { existingCompanies } from '../../api/__mocks__/companies/mockData';


describe('updateOrThrow404 function', () => {
  beforeAll(async () => await connectDb());
  afterAll(async () => await disconnectDb());

  it('should return the updated entity if the returned affected value is different then 0', async () => {
    expect(await updateOrThrow404(
      Company, {
        uuid: existingCompanies[2].uuid,
        name: 'UpdatedName'
      })).toMatchObject({
        uuid: existingCompanies[2].uuid,
        name: 'UpdatedName'
      });
  });

  it('should throw an error if the returned value is null or undefined', async () => {
    const errorCatcher = async () => {
      try { return await updateOrThrow404(Company, { uuid: 'a1111111-b222-c333-d444-e55555555555' }); }
      catch (error) { return error; } 
    };

    expect(await errorCatcher()).toHaveProperty('status', 404);
  });
});