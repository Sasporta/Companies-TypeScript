import { Employee } from '../../../entities/Employee';

export const employeesPath = '/employees';

export const postedEmployee = {
  name: 'Leo Vartan',
  age: 31,
  companyUuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
  managerUuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe'
};

export const updatedEmployee = {
  age: 35,
}

export const existingEmployees = [
  {
    id: 6661,
    company_id: 9991,
    manager_id: null,
    uuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe',
    name: 'angela smith',
    age: 33,
    updated_at: '2022-04-11T04:31:27.798Z',
    created_at: '2022-04-11T04:31:27.798Z'
  },
  {
    id: 6662,
    company_id: 9991,
    manager_id: 6661,
    uuid: '6727011b-f665-469f-888a-9f4c40995d48',
    name: 'John Doe',
    age: 35,
    updated_at: '2022-04-11T04:37:07.828Z',
    created_at: '2022-04-11T04:37:07.828Z'
  },
  {
    id: 6663,
    company_id: 9992,
    manager_id: 6662,
    uuid: '5a7848e1-5e4c-4cad-8859-2a782a32b924',
    name: 'Stepan Johnson',
    age: 29,
    updated_at: '2022-04-11T05:50:07.828Z',
    created_at: '2022-04-11T05:50:07.828Z'
  }
];

export const mockEmployee = () => {
  Employee.create = jest.fn().mockReturnValue({
    uuid: '4bc1a9fd-61dc-4566-bb1a-fd04538f28ea',
    name: postedEmployee.name,
    age: postedEmployee.age,
    save: jest.fn(),
  });

  Employee.find = mockFind;

  mockEmployeesFound();

  Employee.findOneBy = mockFindOneBy;

  mockEmployeeFound();
};

const mockFind = jest.fn();

const mockEmployeesFound = () => mockFind.mockReturnValue([...existingEmployees]);

export const mockEmployeesFoundByCompany = () => mockFind.mockReturnValueOnce([existingEmployees[0], existingEmployees[1]]);

export const mockEmployeesFoundByManager = () => mockFind.mockReturnValueOnce([existingEmployees[1]])

const mockFindOneBy = jest.fn();

const mockEmployeeFound = () => mockFindOneBy.mockReturnValue({
  ...existingEmployees[0],
  remove: jest.fn(),
  save() { mockSave(this) },
});

export const mockEmployeeNotFound = () => mockFindOneBy.mockReturnValueOnce(null);

export const mockEmployeeNotFoundOnSecondTime = () => mockFindOneBy.mockReturnValueOnce({
  ...existingEmployees[0],
  remove: jest.fn(),
  save: jest.fn(),
}).mockReturnValueOnce(null);

const mockSave = (employee: Employee) => Object.keys(employee).forEach(k => {
  if (employee[k] === undefined) employee[k] = existingEmployees[0][k];
});
