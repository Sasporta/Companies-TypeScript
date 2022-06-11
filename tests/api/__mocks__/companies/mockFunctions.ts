import { mockFindOneBy } from '..';
import { Company } from '../../../../entities/Company';
import { existingCompanies, postedCompany } from './mockData';

export const mockCompany = () => {
  Company.create = jest.fn().mockReturnValue({
    ...postedCompany,
    uuid: '58589d65-8f6b-4e64-bb7c-50cd1957c569',
    save: jest.fn(),
  });

  Company.find = jest.fn().mockReturnValue([...existingCompanies]);

  Company.findOneBy = jest.fn().mockImplementation(({ uuid }) => mockFindOneBy(uuid, existingCompanies));
}
