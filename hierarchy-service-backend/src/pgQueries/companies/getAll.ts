import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

type GetAllCompaniesQueryFn = (limit: number) => Promise<Company[]>;

export const getAllCompaniesQuery: GetAllCompaniesQueryFn = limit =>
  dataSource
    .createQueryBuilder()
    .from(Company, 'company')
    .select(['company.uuid', 'company.name', 'company.country'])
    .limit(limit)
    .getMany();
