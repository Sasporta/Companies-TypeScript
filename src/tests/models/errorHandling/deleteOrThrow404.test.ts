import { EXISTING } from '../../api/testsData';
import { Company } from '../../../entities/Company';
import { dataSource } from '../../../config/typeorm';
import ErrorHandling from '../../../models/ErrorHandling';

describe('deleteOrThrow404 method', () => {
  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());

  it('should not return anything is the call was successful', async () => {
    expect(
      await ErrorHandling.deleteOrThrow404(Company)(EXISTING.companies[6].uuid),
    ).toBe(undefined);
  });

  it('should throw a 404 error if an entity with that uuid was not found', async () => {
    const errorCatcher = async () => {
      try {
        return await ErrorHandling.deleteOrThrow404(Company)(
          'a1111111-b222-c333-d444-e55555555555',
        );
      } catch (error) {
        return error;
      }
    };

    expect(await errorCatcher()).toHaveProperty('status', 404);
  });
});
