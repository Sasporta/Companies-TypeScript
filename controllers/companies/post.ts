import { Request } from 'express';

import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';
import { validateAllParamsExists } from '../helpers';

export const createCompany = async ({ body: { name, country } }: Request) => {
  validateAllParamsExists(name, country);

  const { raw: [company] } = await dataSource
    .createQueryBuilder()
    .insert()
    .into(Company)
    .values([{ name, country }])
    .returning('uuid, name, country')
    .execute();

  return { statusCode: 201, content: company };
};
