import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

export const getCompanies = async () => {
  const companies = await dataSource
    .createQueryBuilder()
    .from(Company, 'company')
    .select(['company.uuid', 'company.name', 'company.country'])
    .getMany();

  return { statusCode: 200, content: companies };
};
