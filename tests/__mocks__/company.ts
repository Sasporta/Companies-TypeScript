import { Company } from '../../entities/Company';

export const companiesPath = '/companies';

export const postedCompany = {
  name: 'wix',
  country: 'USA'
}

const existingCompany = {
  id: 9991,
  uuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
  name: 'Affogata',
  country: 'Israel',
  updatedAt: '2022-04-11T04:31:27.798Z',
  createdAt: '2022-04-11T04:31:27.798Z'
}

export const mockCompany = () => {
  Company.findOneBy = mockFindOneBy;

  mockCompanyFound();

  Company.create = jest.fn().mockReturnValue({ save: jest.fn() });

  Company.toJson = jest.fn().mockReturnValue({
    ...postedCompany,
    uuid: '58589d65-8f6b-4e64-bb7c-50cd1957c569',
  });
};

const mockFindOneBy = jest.fn();

export const mockCompanyNotFound = () => mockFindOneBy.mockReturnValueOnce(null);

export const mockCompanyFound = () => mockFindOneBy.mockReturnValue({ ...existingCompany });
