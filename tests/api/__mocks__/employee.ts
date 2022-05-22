import { mockFindOneBy } from '.';
import { Employee } from '../../../entities/Employee';

export const employeesPath = '/employees';

export const postedEmployee = {
  name: 'Leo Vartan',
  age: 31,
  companyUuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
  managerUuid: '5a7848e1-5e4c-4cad-8859-2a782a32b924'
};

export const updatedEmployee = {
  age: 35,
}

export const existingEmployees = [
  {
    id: 1,
    company_id: 1,
    manager_id: null,
    uuid: '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe',
    name: 'angela smith',
    age: 33,
    updated_at: '2022-04-11T04:31:27.798Z',
    created_at: '2022-04-11T04:31:27.798Z'
  },
  {
    id: 2,
    company_id: 1,
    manager_id: 1,
    uuid: '6727011b-f665-469f-888a-9f4c40995d48',
    name: 'John Doe',
    age: 35,
    updated_at: '2022-04-11T04:37:07.828Z',
    created_at: '2022-04-11T04:37:07.828Z'
  },
  {
    id: 3,
    company_id: 2,
    manager_id: 2,
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

  Employee.find = jest.fn().mockImplementation((params) => mockFind(params));

  Employee.findOneBy = jest.fn().mockImplementation(({ uuid }) => mockFindOneBy(uuid, existingEmployees));
};

const mockFind = ({ where: { company_id, manager_id } }: { where: { company_id: number, manager_id: number; }; }) =>
  existingEmployees.filter(e => company_id ? e.company_id === company_id : manager_id ? e.manager_id === manager_id : true);
