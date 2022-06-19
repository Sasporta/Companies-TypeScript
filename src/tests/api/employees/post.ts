import { post, testError } from '../../helpers';
import { employeesPath, postedEmployee, postedManager } from '../employeesData';

export const postRequestTest = () => {
	describe('post employee request', () => {
		it('should return 201 status with new employee', async () => {
			const { statusCode, headers, body } = await post(employeesPath).send(
				postedEmployee,
			);

			expect(statusCode).toBe(201);
			expect(headers['content-type']).toMatch('application/json');
			expect(body).toStrictEqual({
				uuid: expect.any(String),
				name: postedEmployee.name,
				age: postedEmployee.age,
			});
		});

		it('should return 201 status with new manager', async () => {
			const { statusCode, headers, body } = await post(employeesPath).send(
				postedManager,
			);

			expect(statusCode).toBe(201);
			expect(headers['content-type']).toMatch('application/json');
			expect(body).toStrictEqual({
				uuid: expect.any(String),
				name: postedManager.name,
				age: postedManager.age,
			});
		});

		describe('when params missing', () => testError(post, employeesPath, 422));

		describe('when company uuid invalid', () => {
			testError(post, employeesPath, 422, {
				...postedEmployee,
				companyUuid: 'a1111111-b222-c333-d444-e55555555555',
			});
		});

		describe('when manager uuid invalid', () => {
			testError(post, employeesPath, 422, {
				...postedEmployee,
				managerUuid: 'a1111111-b222-c333-d444-e55555555555',
			});
		});
	});
};
