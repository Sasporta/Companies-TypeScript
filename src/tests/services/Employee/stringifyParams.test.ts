import EmployeeService from '../../../services/businessLogic/Employee';

describe('stringifyParams method', () => {
  it('should only string params that are not undefined', async () => {
    expect(
      EmployeeService.stringifyParams({
        limit: 10,
        companyUuid: undefined,
        managerUuid: undefined,
        path: 'cousins',
        uuid: 'id',
      }),
    ).toBe('_cousins?uuid:id?limit:10');
  });

  expect(
    EmployeeService.stringifyParams({
      limit: 10,
      companyUuid: 'abc',
      managerUuid: 'abc',
      path: undefined,
      uuid: undefined,
    }),
  ).toBe('?companyUuid:abc?managerUuid:abc?limit:10');
});