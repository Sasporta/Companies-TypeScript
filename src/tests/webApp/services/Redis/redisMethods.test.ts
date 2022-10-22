import Redis from '../../../../services/Redis';
import { CompanyEntity } from '../../../../entities/Company';


describe('Redis methods', () => {
  beforeAll(() => Redis.connect());

  afterAll(() => Redis.disconnect());

  const company = {
    name: 'set-test name',
    country: 'set-test country',
  } as CompanyEntity;

  describe('get method', () => {
    beforeAll(
      async () => await Redis.instance.set('get-key', JSON.stringify(company)),
    );

    it('should fetch the value of a chosen key', async () => {
      const result = await Redis.get('get-key');

      expect(result).toStrictEqual(company);
    });
  });

  describe('set method', () => {
    it('should set a chosen value of type entities with EX of 691200000 ms', async () => {
      await Redis.set('set-key', company);

      const result = JSON.parse(
        (await Redis.instance.get('set-key')) as string,
      );

      const ttl = await Redis.instance.ttl('set-key');

      expect(result).toStrictEqual(company);
      expect(ttl).toBeGreaterThan(691190000);
      expect(ttl).toBeLessThanOrEqual(691200000);
    });
  });

  describe('remove method', () => {
    beforeAll(
      async () => await Redis.instance.set('remove-key', 'remove-test value'),
    );

    it('should remove a value', async () => {
      await Redis.remove('remove-key');

      const result = await Redis.instance.get('remove-key');

      expect(result).toStrictEqual(null);
    });
  });

  describe('removeAll method', () => {
    beforeAll(
      async () =>
        await Promise.all([
          Redis.instance.set('removeAll-key1', 'removeAll-test value1'),
          Redis.instance.set('removeAll-key2', 'removeAll-test value2'),
          Redis.instance.set('removeAll-key3', 'removeAll-test value3'),
        ]),
    );

    it('should remove all values of a chosen pattern', async () => {
      await Redis.removeAll('removeAll-key');

      await new Promise(resolve => setTimeout(resolve, 10));

      const result = await Redis.instance.mget(
        'removeAll-key1',
        'removeAll-key2',
        'removeAll-key3',
      );

      expect(result).toStrictEqual([null, null, null]);
    });
  });
});
