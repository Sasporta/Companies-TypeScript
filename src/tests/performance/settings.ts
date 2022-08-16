import { get, testPerformance } from '../helpers';

const apiBenchmark = 100;

const queryBenchmark = 150;

const iterations = 50;

export const maxTestingTime = 30000;

export const testGetReqPerformance = testPerformance(
	apiBenchmark,
	iterations,
)(get);

export const testQueryPerformance = testPerformance(
	queryBenchmark,
	iterations,
);
