import { Company } from '../../entities/Company';

export const companiesPath = '/companies';

export const postedCompany = {
  name: 'wix',
  country: 'USA'
}

export const existingCompanies = [
  {
    id: 9991,
    uuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
    name: 'Affogata',
    country: 'Israel',
    updatedAt: '2022-04-11T04:31:27.798Z',
    createdAt: '2022-04-11T04:31:27.798Z'
  },
  {
    id: 9992,
    uuid: '50fb8bb5-3995-4193-a670-09b9900255e9',
    name: 'Wix',
    country: 'USA',
    updatedAt: '2022-04-11T04:37:07.828Z',
    createdAt: '2022-04-11T04:37:07.828Z'
  },
  {
    id: 9993,
    uuid: 'fa772f84-366d-4121-9493-be1fa0d76055',
    name: 'Riot Games',
    country: 'USA',
    updatedAt: '2022-04-11T05:50:07.828Z',
    createdAt: '2022-04-11T05:50:07.828Z'
  }
]

export const mockCompany = () => {
  Company.find = jest.fn().mockReturnValue({ ...existingCompanies });

  Company.findOneBy = mockFindOneBy;

  mockCompanyFound();

  Company.create = jest.fn().mockReturnValue({ save: jest.fn() });

  Company.toJson = jest.fn().mockReturnValue({
    ...postedCompany,
    uuid: '58589d65-8f6b-4e64-bb7c-50cd1957c569',
  });

  Company.arrayToJson = jest.fn().mockReturnValue(
    existingCompanies.map(({ uuid, name, country }) => ({ uuid, name, country }))
  );
};

const mockFindOneBy = jest.fn();

export const mockCompanyNotFound = () => mockFindOneBy.mockReturnValueOnce(null);

export const mockCompanyFound = () => mockFindOneBy.mockReturnValue({ ...existingCompanies[0] });
