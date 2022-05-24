import { Request } from 'express';

import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';
import { findOrThrow, update, validateAtLeastOneParamExists } from '../helpers';

export const updateCompany = async ({ params: { id: uuid }, body: { name, country } }: Request) => {
  validateAtLeastOneParamExists(name, country);

  const company = await findOrThrow(Company, uuid, 404);

  update(company, { name, country });

  await company.save();

  return { statusCode: 200, content: format(company) };
};
