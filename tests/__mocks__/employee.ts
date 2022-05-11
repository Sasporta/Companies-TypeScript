import { Employee } from '../../entities/Employee';

export const employeesPath = '/employees';

export const postedEmployee = {
  name: 'Leo Vartan',
  age: 31,
  companyUuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
  managerUuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe'
};

export const existingEmployees = [
  {
    id: 6661,
    companyId: 9991,
    managerId: null,
    uuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe',
    name: 'angela smith',
    age: 33,
    updatedAt: '2022-04-11T04:31:27.798Z',
    createdAt: '2022-04-11T04:31:27.798Z'
  },
  {
    id: 6662,
    companyId: 9991,
    managerId: 6661,
    uuid: '6727011b-f665-469f-888a-9f4c40995d48',
    name: 'John Doe',
    age: 35,
    updatedAt: '2022-04-11T04:37:07.828Z',
    createdAt: '2022-04-11T04:37:07.828Z'
  },
  {
    id: 6663,
    companyId: 9992,
    managerId: 6662,
    uuid: '5a7848e1-5e4c-4cad-8859-2a782a32b924',
    name: 'Stepan Johnson',
    age: 29,
    updatedAt: '2022-04-11T05:50:07.828Z',
    createdAt: '2022-04-11T05:50:07.828Z'
  }
];

export const mockEmployee = () => {
  Employee.find = jest.fn().mockReturnValue({ ...existingEmployees });

  Employee.findOneBy = mockFindOneBy;

  mockEmployeeFound();

  Employee.create = jest.fn().mockReturnValue({ save: jest.fn() });

  Employee.toJson = jest.fn().mockReturnValue({
    name: postedEmployee.name,
    age: postedEmployee.age,
    uuid: '4bc1a9fd-61dc-4566-bb1a-fd04538f28ea',
  });

  Employee.arrayToJson = jest.fn().mockReturnValue(
    existingEmployees.map(({ uuid, name, age }) => ({ uuid, name, age }))
  );
};

const mockFindOneBy = jest.fn();

export const mockEmployeeNotFound = () => mockFindOneBy.mockReturnValueOnce(null);

export const mockEmployeeFound = () => mockFindOneBy.mockReturnValue({ ...existingEmployees[0] });
