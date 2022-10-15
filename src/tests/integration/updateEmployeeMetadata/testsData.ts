const testCompaniesUuids = [
  'd0f1b894-12d2-41cc-9a8b-857e995ac3c1',
  '4c1287e3-8493-47e6-9ab7-7d8dd1889c42',
];

export const testEmployeesUuids = [
  '5b5d4cec-6145-45ab-acd9-00ed51de60d7',
  '5ac5d2b7-be2a-4257-9a0d-6524403b7361',
  '4889a1c8-3064-4fd9-8f70-7326d121c081',
];

export const PATH = {
  EMPLOYEES: '/employees',
  EMPLOYEES_METADATA: '/employeesMetadata',
};

export const POSTED = {
  employee: {
    name: 'PostedEmployee',
    title: 'employee3',
    companyUuid: testCompaniesUuids[1],
    managerUuid: testEmployeesUuids[2],
  },
};

export const UPDATED = {
  employeeToDiffCompanyAndManager: {
    companyUuid: testCompaniesUuids[1],
    managerUuid: testEmployeesUuids[2],
  },
};
