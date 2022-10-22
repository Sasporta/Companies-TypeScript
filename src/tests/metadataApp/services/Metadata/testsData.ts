const testCompaniesUuids = [
  '367b6446-8d11-411a-ab42-faefa67b2fbe',
  'acd14f6f-d639-4e3e-95ed-d7af0b217288',
];

const testEmployeesUuids = [
  'c07319d8-f077-4318-a3f1-66a2d0af141e',
  '156ff148-eb6c-423a-aeca-732d7296e162',
  'b754775b-0865-473d-bcdc-2b5fd3fa5597',
];

export const MESSAGE = {
  create: {
    action: 'create',
    employeeUuid: '03954879-99a7-45a6-9d54-0eada41aadb1',
    companyUuid: testCompaniesUuids[1],
    futureManagerUuid: testEmployeesUuids[2],
  },
  update: {
    action: 'update',
    employeeUuid: testEmployeesUuids[1],
    companyUuid: testCompaniesUuids[1],
    futureManagerUuid: testEmployeesUuids[2],
    previousManagerUuid: testEmployeesUuids[0],
  },
  delete: {
    action: 'delete',
    employeeUuid: testEmployeesUuids[0],
    previousManagerUuid: undefined,
  },
};
