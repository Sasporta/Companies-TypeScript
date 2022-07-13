import request from 'supertest';
import { performance } from 'perf_hooks';

import app from '../app';
import resDoc from '../swagger/docs/components/responses';

export const { get, post, patch, delete: destroy } = request(app);

export const testError = (
	crudMethod: (a: string) => any,
	path: string,
	errorCode: number,
	reqBody: object = {},
) => {
	it(`should return ${errorCode} status with proper error message`, async () => {
		const { status, body } = await crudMethod(path).send(reqBody);

		expect(status).toBe(errorCode);
		expect(body).toStrictEqual(resDoc.responses[errorCode]);
	});
};

export const testPerformance =
	(benchmark: number, iterations: number, crudMethod: (a: string) => any) =>
		(path: string) => {
			it(`should have an average time of less than ${benchmark} ms`,
				async () => {
					let performanceSum = 0;

					for (let i = 0; i < iterations; i++) {
						const start = performance.now();

						const { statusCode, headers } = await crudMethod(path);

						const duration = performance.now() - start;

						performanceSum += duration;

						expect(statusCode).toBe(200);
						expect(headers['content-type']).toMatch('application/json');
					}

					console.log('average time: ', performanceSum / iterations);

					expect(performanceSum / iterations).toBeLessThan(benchmark);
				}
			);
		};
