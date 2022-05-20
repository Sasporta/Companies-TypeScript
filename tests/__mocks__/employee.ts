import { Employee } from '../../entities/Employee';

export const employeesPath = '/employees';

export const postedEmployee = {
  name: 'Leo Vartan',
  age: 31,
  companyUuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
  managerUuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe'
};

const existingManager = {
  id: 6661,
  companyId: 9991,
  managerId: null,
  uuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe',
  name: 'angela smith',
  age: 33,
  updatedAt: '2022-04-11T04:31:27.798Z',
  createdAt: '2022-04-11T04:31:27.798Z'
};

export const mockEmployee = () => {
  Employee.findOneBy = mockFindOneBy;

  mockEmployeeFound();

  Employee.create = jest.fn().mockReturnValue({ save: jest.fn() });

  Employee.toJson = jest.fn().mockReturnValue({
    name: postedEmployee.name,
    age: postedEmployee.age,
    uuid: '4bc1a9fd-61dc-4566-bb1a-fd04538f28ea',
  });
};

const mockFindOneBy = jest.fn();

export const mockEmployeeNotFound = () => mockFindOneBy.mockReturnValueOnce(null);

export const mockEmployeeFound = () => mockFindOneBy.mockReturnValue({ ...existingManager });
