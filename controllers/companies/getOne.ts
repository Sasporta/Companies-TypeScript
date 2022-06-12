import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { Company } from '../../entities/Company';

export const getCompany = async ({ params: { id: uuid } }: Request) => {
  const company = await findOrThrow(Company, uuid, 404);

  return { statusCode: 200, content: { uuid: company.uuid, name: company.name, country: company.country } };
};
