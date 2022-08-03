import Redis from '../../../models/Redis';
import { redis } from '../../../config/redis';
import { Company } from '../../../entities/Company';

describe('Redis methods', () => {
	afterAll(async () => await redis.disconnect());

	const company = {
		name: 'set-test name',
		country: 'set-test country',
	} as Company;

	describe('get method', () => {
		beforeAll(async () => await redis.set('get-key', JSON.stringify(company)));

		it('should fetch the value of a chosen key', async () => {
			const result = await Redis.get('get-key');

			expect(result).toStrictEqual(company);
		});
	});

	describe('set method', () => {
		it('should set a chosen value of type entities with EX of 691200000 ms', async () => {
			await Redis.set('set-key', company);

			const result = JSON.parse(await redis.get('set-key'));

			const ttl = await redis.ttl('set-key');

			expect(result).toStrictEqual(company);
			expect(ttl).toBeGreaterThan(691190000);
			expect(ttl).toBeLessThanOrEqual(691200000);
		});
	});

	describe('remove method', () => {
		beforeAll(async () => await redis.set('remove-key', 'remove-test value'));

		it('should remove a value', async () => {
			await Redis.remove('remove-key');

			const result = await redis.get('remove-key');

			expect(result).toStrictEqual(null);
		});
	});

	describe('removeAll method', () => {
		beforeAll(async () => {
			await redis.set('removeAll-key1', 'removeAll-test value1');
			await redis.set('removeAll-key2', 'removeAll-test value2');
			await redis.set('removeAll-key3', 'removeAll-test value3');
		});

		it('should remove all values of a chosen pattern', async () => {
			await Redis.removeAll('removeAll-key');

			await new Promise(resolve => setTimeout(resolve, 10));

			const result = await redis.mget(
				'removeAll-key1',
				'removeAll-key2',
				'removeAll-key3',
			);

			expect(result).toStrictEqual([null, null, null]);
		});
	});
});
