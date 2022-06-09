import { mockFindOneBy } from '.';
import { Company } from '../../../entities/Company';
import { dataSource } from '../../../config/typeorm';

export const companiesPath = '/companies';

export const postedCompany = {
  name: 'Blizzard Entertainment',
  country: 'USA',
}

export const updatedCompany = {
  country: 'England',
}

export const existingCompanies = [
  {
    id: 1,
    uuid: '12d1e461-53ce-4b59-a0d8-c3baffceadb2',
    name: 'Affogata',
    country: 'Israel',
    updated_at: '2022-04-11T04:31:27.798Z',
    created_at: '2022-04-11T04:31:27.798Z'
  },
  {
    id: 2,
    uuid: '50fb8bb5-3995-4193-a670-09b9900255e9',
    name: 'Wix',
    country: 'USA',
    updated_at: '2022-04-11T04:37:07.828Z',
    created_at: '2022-04-11T04:37:07.828Z'
  },
  {
    id: 3,
    uuid: 'fa772f84-366d-4121-9493-be1fa0d76055',
    name: 'Riot Games',
    country: 'USA',
    updated_at: '2022-04-11T05:50:07.828Z',
    created_at: '2022-04-11T05:50:07.828Z'
  }
]

export const mockCompany = () => {
  Company.create = jest.fn().mockReturnValue({
    ...postedCompany,
    uuid: '58589d65-8f6b-4e64-bb7c-50cd1957c569',
    save: jest.fn(),
  });

  Company.find = jest.fn().mockReturnValue([...existingCompanies]);

  Company.findOneBy = jest.fn().mockImplementation(({ uuid }: { uuid: string }) => mockFindOneBy(uuid, existingCompanies));
};
