export const employeesPath = '/employees';

export const postedEmployee = {
  name: 'PostedEmployee',
  age: 40,
  companyUuid: 'aa7e4bd8-a649-4141-8383-beacd85a4e24',
  managerUuid: '5a7848e1-5e4c-4cad-8859-2a782a32b924',
}

export const postedManager = {
  name: 'PostedManager',
  age: 50,
  companyUuid: 'aa7e4bd8-a649-4141-8383-beacd85a4e24',
  managerUuid: null,
}

export const updatedEmployee = {
  age: 100,
}

export const updatedEmployeeToManager = {
  managerUuid: null,
}

export const existingEmployees = [
  {
    id: 1,
    company_id: 4,
    manager_id: null,
    uuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe',
    name: 'TestEmployeeForEmployeesTest1',
    age: 10,
    updated_at: '2022-04-11T04:31:27.798Z',
    created_at: '2022-04-11T04:31:27.798Z',
  },
  {
    id: 2,
    company_id: 4,
    manager_id: 1,
    uuid: '6727011b-f665-469f-888a-9f4c40995d48',
    name: 'TestEmployeeForEmployeesTest2',
    age: 20,
    updated_at: '2022-04-11T04:37:07.828Z',
    created_at: '2022-04-11T04:37:07.828Z',
  },
  {
    id: 3,
    company_id: 5,
    manager_id: null,
    uuid: '5a7848e1-5e4c-4cad-8859-2a782a32b924',
    name: 'TestEmployeeForEmployeesTest3',
    age: 30,
    updated_at: '2022-04-11T05:50:07.828Z',
    created_at: '2022-04-11T05:50:07.828Z',
  }
];