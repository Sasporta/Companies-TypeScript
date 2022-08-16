import request from 'supertest';

import { testPerformance } from '../helpers';

const loadTestEnvUrl = 'https://hierarchy-service-backend-load.herokuapp.com';

const apiBenchmark = 300;

const queryBenchmark = 100;

const iterations = 50;

const { get } = request(loadTestEnvUrl);

export const maxTestingTime = 30000;

export const testGetReqPerformance = testPerformance(
	apiBenchmark,
	iterations,
)(get);

export const testQueryPerformance = testPerformance(
	queryBenchmark,
	iterations,
);
