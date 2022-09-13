import request from 'supertest';
import { performance } from 'perf_hooks';

import app from '../app';
import resDoc from '../swagger/docs/components/responses';

type CrudMethodFn = (a: string) => request.Test;

type TestErrorFn = (
  crudMethod: CrudMethodFn,
  path: string,
  errorCode: number,
  reqBody?: object,
) => void;

type SomeProcessFn = (...params: unknown[]) => Promise<void>;

type TestPerformanceFn = (
  benchmark: number,
  iterations: number,
) => (someProcess: SomeProcessFn) => (...params: unknown[]) => void;

export const { get, post, patch, delete: destroy } = request(app);

export const testError: TestErrorFn = (
  crudMethod,
  path,
  errorCode,
  reqBody = {},
) => {
  it(`should return ${errorCode} status with proper error message`, async () => {
    const { status, body } = await crudMethod(path).send(reqBody);

    expect(status).toBe(errorCode);
    expect(body).toStrictEqual(resDoc.responses[errorCode]);
  });
};

export const testPerformance: TestPerformanceFn =
  (benchmark, iterations) =>
    someProcess =>
      (...params) => {
        it(`should have an average time of less than ${benchmark} ms`, async () => {
          let performanceSum = 0;

          for (let i = 0; i < iterations; i++) {
            const start = performance.now();

            await someProcess(...params);

            const duration = performance.now() - start;

            performanceSum += duration;
          }

          console.log('average time: ', performanceSum / iterations);

          expect(performanceSum / iterations).toBeLessThan(benchmark);
        });
      };
