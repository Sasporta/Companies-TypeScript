import { get } from '../../helpers';
import { companiesPath } from '../../api/companiesData';

describe('controllerWrapper method', () => {
	it('should throw an error if something wrong and unexpected happened', async () => {
		const { status, body } = await get(companiesPath);

		expect(status).toBe(500);
		expect(body).toStrictEqual(
			'Class constructor Company cannot be invoked without \'new\'',
		);
	});
});
