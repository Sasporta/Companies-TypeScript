import { Request } from 'express';

import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';
import { throwError, validateAtLeastOneParamExists } from '../helpers';

export const updateCompany = async ({ params: { id: uuid }, body: { name, country } }: Request) => {
  validateAtLeastOneParamExists(name, country);

  const { raw: [company], affected } = await dataSource
    .createQueryBuilder()
    .update(Company)
    .set({ name, country })
    .where("uuid = :uuid", { uuid })
    .returning('uuid, name, country')
    .execute();

  if (affected === 0) throwError(404);

  return { statusCode: 200, content: company };
};
