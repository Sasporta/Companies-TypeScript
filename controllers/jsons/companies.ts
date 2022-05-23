import { Company } from '../../entities/Company';

export const format = (company: Company) => ({
  uuid: company.uuid,
  name: company.name,
  country: company.country,
});
