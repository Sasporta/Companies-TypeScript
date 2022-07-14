import { get, testPerformance } from '../../helpers';

const benchmark = 150;

const iterations = 50;

export const maxTestingTime = 30000;

export const testGetPerformance = testPerformance(benchmark, iterations, get);
