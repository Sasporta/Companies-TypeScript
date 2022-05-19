import { Company } from '../../../entities/company';
import { format } from '../../../controllers/jsons/companies';

it('should return the proper company json', () => {
  const company = new Company;

  company.id = 6661;
  company.uuid = '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe';
  company.name = 'angela smith';
  company.country = 'Israel';
  company.created_at = new Date;
  company.created_at = new Date;

  expect(format(company)).toStrictEqual({
    uuid: company.uuid,
    name: company.name,
    country: company.country,
  });
});
