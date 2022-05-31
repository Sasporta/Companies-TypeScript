import { Request } from 'express';

import { throwError } from '../helpers';
import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

export const getCompany = async ({ params: { id: uuid } }: Request) => {
  const company = await dataSource
    .createQueryBuilder()
    .select(['company.uuid', 'company.name', 'company.country'])
    .from(Company, 'company')
    .where('uuid = :uuid', { uuid })
    .getOne();

  if (company === null) throwError(404);

  return { statusCode: 200, content: company };
};
