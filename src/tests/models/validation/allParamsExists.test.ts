import { bodyParams } from '../../../types/global';
import Validation from '../../../models/Validation';

describe('allParamsExists method', () => {
	const validate = async (
		validateFunction: (...params: bodyParams[]) => void,
		...params: bodyParams[]
	) => {
		try {
			validateFunction(...params);

			return 'success!';
		} catch (error) {
			return error;
		}
	};

	it('should not throw an error if all params are different then undefined', async () => {
		expect(await validate(Validation.allParamsExists, true, 1, {}, 'yes')).toBe(
			'success!',
		);
	});

	it('should throw an error if even one of the params is undefined', async () => {
		expect(
			await validate(Validation.allParamsExists, true, 1, {}, 'yes', undefined),
		).toHaveProperty('status', 422);
	});
});
