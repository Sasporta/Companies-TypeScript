import { mockFindOneBy } from '..';
import { Employee } from '../../../../entities/Employee';
import { existingEmployees, postedEmployee } from './mockData';

export const mockEmployee = () => {
  Employee.create = jest.fn().mockReturnValue({
    uuid: '4bc1a9fd-61dc-4566-bb1a-fd04538f28ea',
    name: postedEmployee.name,
    age: postedEmployee.age,
    save: jest.fn(),
  });

  Employee.find = jest.fn().mockImplementation((params) => mockFind(params));

  Employee.findOneBy = jest.fn().mockImplementation(({ uuid }) => mockFindOneBy(uuid, existingEmployees));
}

const mockFind = ({ where: { company_id, manager_id } }: { where: { company_id: number, manager_id: number; }; }) =>
  existingEmployees.filter(e => company_id ? e.company_id === company_id : manager_id ? e.manager_id === manager_id : true);
