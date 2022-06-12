import { Request } from 'express';

import { getLimit } from '../helpers';
import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

export const getCompanies = async ({ query: { limit } }: Request) => {
  const companies = await dataSource
    .createQueryBuilder()
    .from(Company, 'company')
    .select(['company.uuid', 'company.name', 'company.country'])
    .limit(getLimit(+limit))
    .getMany();

  return { statusCode: 200, content: companies };
};
