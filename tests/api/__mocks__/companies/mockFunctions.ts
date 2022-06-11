import crypto from 'crypto';

import { mockFindOneBy } from '..';
import { existingCompanies } from './mockData';
import { Company } from '../../../../entities/Company';

export const mockCompany = () => {
  Company.create = jest.fn().mockImplementation(({ name, country }) => ({
    uuid: crypto.randomUUID(),
    name,
    country,
    save: jest.fn(),
  }));

  Company.findOneBy = jest.fn().mockImplementation(({ uuid }) => mockFindOneBy(uuid, existingCompanies));
}
