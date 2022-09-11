import { EXISTING } from '../../api/testsData';
import { Company } from '../../../entities/Company';
import { dataSource } from '../../../config/typeorm';
import ErrorHandling from '../../../modules/ErrorHandling';

describe('updateOrThrow404 method', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());

  it('should return the updated entity if the returned affected value is different then 0', async () => {
    expect(
      await ErrorHandling.updateOrThrow404(Company)({
        uuid: EXISTING.companies[7].uuid,
        name: 'UpdatedName',
      }),
    ).toMatchObject({
      uuid: EXISTING.companies[7].uuid,
      name: 'UpdatedName',
    });
  });

  it('should throw an error if the returned value is null or undefined', async () => {
    const errorCatcher = async () => {
      try {
        return await ErrorHandling.updateOrThrow404(Company)({
          uuid: 'a1111111-b222-c333-d444-e55555555555',
        });
      } catch (error) {
        return error;
      }
    };

    expect(await errorCatcher()).toHaveProperty('status', 404);
  });
});
