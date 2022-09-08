import request from 'supertest';

import { testPerformance } from '../helpers';

const iterations = 50;

const apiBenchmark = 300;

const queryBenchmark = 100;

const loadTestEnvUrl = 'https://hierarchy-service-backend-load.herokuapp.com';

export const { get } = request(loadTestEnvUrl);

export const testGetReqPerformance = testPerformance(
  apiBenchmark,
  iterations,
)(get);

export const testQueryPerformance = testPerformance(queryBenchmark, iterations);
