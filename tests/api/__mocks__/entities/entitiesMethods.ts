import crypto from 'crypto';

import { Company } from '../../../../entities/Company';
import { Employee } from '../../../../entities/Employee';
import { existingCompanies } from './CompaniesData';
import { existingEmployees } from './EmployeesData';

const collections = [
  {
    model: Company,
    records: existingCompanies,
  },
  {
    model: Employee,
    records: existingEmployees,
  },
];

const mockFindOneBy = jest.fn().mockImplementation(
  (list: { uuid: string }[]) =>
  ({ uuid }: { uuid: string }) =>
  list.reduce((a, c) => c.uuid === uuid
    ? { ...c, remove: jest.fn(), save: jest.fn() }
    : a
  , null)
);

const mockCreate = jest.fn().mockImplementation(({ ...properties }) => ({
  uuid: crypto.randomUUID(),
  ...properties,
  save: jest.fn(),
}));

export const mockEntitiesMethods = () => {
  collections.forEach(collection => {
    collection.model.create = mockCreate;
    
    collection.model.findOneBy = mockFindOneBy(collection.records);
  })
}