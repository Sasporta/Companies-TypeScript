import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    clearMocks: true,
    preset: 'ts-jest',
    collectCoverage: true,
    testEnvironment: 'node',
    coverageReporters: ['text-summary'],
    collectCoverageFrom: ['src/controllers/**'],
  };
};
