import { getLimit } from '../../../controllers/helpers';

describe('getLimit function', () => {
	it('should return the limit is its a valid value (between 1 to 10)', async () => {
		expect(getLimit(5)).toBe(5);
	});

	it('should return the default limit value (10) if param is invalid', async () => {
		expect(getLimit(0)).toBe(10);
		expect(getLimit(NaN)).toBe(10);
		expect(getLimit(1001)).toBe(10);
	});
});
