import crypto from 'crypto';

import { mockFindOneBy } from '..';
import { existingEmployees } from './mockData';
import { Employee } from '../../../../entities/Employee';

export const mockEmployee = () => {
  Employee.create = jest.fn().mockImplementation(({ name, age }) => ({
    uuid: crypto.randomUUID(),
    name,
    age,
    save: jest.fn(),
  }));

  Employee.findOneBy = jest.fn().mockImplementation(({ uuid }) => mockFindOneBy(uuid, existingEmployees));
}