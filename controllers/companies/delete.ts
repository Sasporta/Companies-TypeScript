import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { Company } from '../../entities/Company';

export const deleteCompany = async ({ params: { id: uuid } }: Request) => {
  const company = await findOrThrow(Company, uuid, 404);

  company.remove()

  return { statusCode: 204 };
};
