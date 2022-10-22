import { CompanyEntity } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

type GetAllCompaniesQueryFn = (limit: number) => Promise<CompanyEntity[]>;

export const getAllQuery: GetAllCompaniesQueryFn = limit =>
  dataSource
    .createQueryBuilder()
    .from(CompanyEntity, 'company')
    .select(['company.uuid', 'company.name', 'company.country'])
    .limit(limit)
    .getMany();
