import { getLimit } from '../../../controllers/helpers';

describe('getLimit function', () => {
	it('should return the limit is its a valid value (between 1 to 10)', async () => {
		expect(getLimit(5)).toBe(5);
	});

	it('should return the defult limit value (10) if param is invalid', async () => {
		expect(getLimit(NaN)).toBe(10);
		expect(getLimit(11)).toBe(10);
	});
});
