const testCompaniesUuids = [
  '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
  '50fb8bb5-3995-4193-a670-09b9900255e9',
  'fa772f84-366d-4121-9493-be1fa0d76055',
  'aa7e4bd8-a649-4141-8383-beacd85a4e24',
  'c7a1d809-399d-4991-ad8e-5803c54a0213',
  'ed9bde07-516f-403a-be33-01aa633fa3f3',
  'd0f1b894-12d2-41cc-9a8b-857e995ac3c1',
  '4c1287e3-8493-47e6-9ab7-7d8dd1889c42',
];

const testCompaniesNames = [
  'TestCompanyForCompaniesTest1',
  'TestCompanyForCompaniesTest2',
  'TestCompanyForCompaniesTest3',
  'TestCompanyForEmployeesTest1',
  'TestCompanyForEmployeesTest2',
  'TestCompanyForEmployeesTest3',
  'TestCompanyForIntegrationTest1',
  'TestCompanyForIntegrationTest2',
];

const testEmployeesUuids = [
  '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe',
  '6727011b-f665-469f-888a-9f4c40995d48',
  '50e8c50a-4ba0-4329-98c1-725025f8cc45',
  'c3a9898b-aa86-4c8c-89a5-5a96a7a0711f',
  '47a89e37-aef0-4690-80a3-2383ea7bd285',
  '48f91ff6-1cdd-49ca-a382-c7a581342d8c',
  'f8293029-ed60-4a84-a581-cb8e64f84553',
  '5a7848e1-5e4c-4cad-8859-2a782a32b924',
];

const testEmployeesTitles = [
  'CEO',
  'manager1',
  'manager2',
  'employee1',
  'employee2',
  'employee1',
  'employee2',
  'CEO',
];

const testEmployeesManagersIds = [null, 1, 1, 2, 2, 3, 3, null];

export const EXISTING = {
  companies: testCompaniesUuids.map((uuid, i) => ({
    id: i + 1,
    uuid,
    name: testCompaniesNames[i],
    country: `Country${i + 1}`,
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  })),
  employees: testEmployeesUuids.map((uuid, i) => ({
    id: i + 1,
    uuid,
    name: `TestEmployeeForEmployeesTest${i + 1}`,
    title: testEmployeesTitles[i],
    company_id: i === 7 ? 5 : 4,
    manager_id: testEmployeesManagersIds[i],
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  })),
  employeesMetadata: testEmployeesUuids.map((uuid, i) => ({
    _id: uuid,
    companyUuid: i === 7 ? testCompaniesUuids[5] : testCompaniesUuids[4],
    subordinatesCount: i < 3 ? 2 : 0,
  })),
};

export const PATH = {
  COMPANIES: '/companies',
  EMPLOYEES: '/employees',
  EMPLOYEES_METADATA: '/employeesMetadata',
};

export const POSTED = {
  company: {
    name: 'PostedCompany',
    country: 'PostedCountry',
  },
  employee: {
    name: 'PostedEmployee',
    title: 'employee3',
    companyUuid: testCompaniesUuids[3],
    managerUuid: testEmployeesUuids[2],
  },
  manager: {
    name: 'PostedManager',
    title: 'manager3',
    companyUuid: testCompaniesUuids[3],
    managerUuid: null,
  },
};

export const UPDATED = {
  company: {
    country: 'UpdatedCountry',
  },
  employee: {
    title: 'UpdatedTitle',
  },
  employeeToManager: {
    managerUuid: null,
  },
  managerToEmployee: {
    managerUuid: testEmployeesUuids[0],
  },
  employeeToDiffCompanyAndManager: {
    companyUuid: testCompaniesUuids[4],
    managerUuid: testEmployeesUuids[7],
  },
};

export const BAD = {
  uuid: '0414e768-b769-44f1-aca2-e13d73a4a3ba',
};
