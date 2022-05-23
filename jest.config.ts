import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
  }
}
