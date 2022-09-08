import { testGetReqPerformance } from '../settings';

export const companiesLoadTest = () => {
  describe('companies api performance tests', () => {
    describe('getAll', () => testGetReqPerformance('/companies?limit=100'));

    describe('getOne', () =>
      testGetReqPerformance('/companies/f791f842-7616-4cc0-82d8-e3151faf545c'));
  });
};
