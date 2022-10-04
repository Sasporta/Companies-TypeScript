import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    clearMocks: true,
    preset: 'ts-jest',
    collectCoverage: true,
    testEnvironment: 'node',
    coverageReporters: ['text-summary'],
    collectCoverageFrom: [
      'src/apps/web/controllers/**',
      'src/apps/web/middleware/**',
      'src/apps/web/routes/**',
      'src/apps/web/app.ts',
      'src/apps/web/server.ts',
      'src/apps/metadata/**',
      'src/config/**',
      'src/entities/**',
      'src/modules/**',
      'src/pgQueries/**',
      'src/services/**',
    ],
  };
};
