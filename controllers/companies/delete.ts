import { Request } from 'express';

import { throwError } from '../helpers';
import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

export const deleteCompany = async ({ params: { id: uuid } }: Request) => {
  const { affected } = await dataSource
    .createQueryBuilder()
    .delete()
    .from(Company)
    .where('uuid = :uuid', { uuid })
    .execute();

  if (affected === 0) throwError(404);

  return { statusCode: 204 };
};
