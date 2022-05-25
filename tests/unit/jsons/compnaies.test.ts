import { Company } from '../../../entities/company';
import { format } from '../../../controllers/jsons/companies';

it('should return the proper company json', () => {
  const company = new Company;

  company.id = 6661;
  company.uuid = '9421e3e5-589e-4dfb-89f9-0c9a9a9fc3a9';
  company.name = 'new company';
  company.country = 'Israel';
  company.created_at = new Date;
  company.created_at = new Date;

  expect(format(company)).toStrictEqual({
    uuid: company.uuid,
    name: company.name,
    country: company.country,
  });
});
