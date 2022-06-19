import { get, testError } from '../../helpers';
import { employeesPath, existingEmployees } from '../employeesData';

export const getOneRequestTest = () => {
	describe('get employee request', () => {
		it('should return 200 status with employee', async () => {
			const { statusCode, headers, body } = await get(
				employeesPath + '/' + existingEmployees[0].uuid,
			);

			expect(statusCode).toBe(200);
			expect(headers['content-type']).toMatch('application/json');
			expect(body).toStrictEqual({
				uuid: existingEmployees[0].uuid,
				name: existingEmployees[0].name,
				age: existingEmployees[0].age,
			});
		});

		describe('when employee uuid invalid', () =>
			testError(
				get,
				employeesPath + '/a1111111-b222-c333-d444-e55555555555',
				404,
			));
	});
};
