import { update } from '../../../controllers/helpers';

describe('update function', () => {
  it('should update all values that are no undefined', async () => {
    const entity = { name: 'test', age: 1, height: 1.80, weight: 10 };

    const updates = { name: 'new name', age: 100, height: null, weight: undefined };

    update(entity, updates)

    expect(entity).toStrictEqual({
      name: 'new name',
      age: 100,
      height: null,
      weight: 10,
    });
  });
});
