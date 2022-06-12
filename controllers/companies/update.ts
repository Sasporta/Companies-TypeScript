import { Request } from 'express';

import { Company } from '../../entities/Company';
import { updateOrThrow404, validateAtLeastOneParamExists } from '../helpers';

export const updateCompany = async ({ params: { id: uuid }, body: { name, country } }: Request) => {
  validateAtLeastOneParamExists(name, country);

  const company = await updateOrThrow404(Company, { uuid, name, country });

  return { statusCode: 200, content: { uuid: company.uuid, name: company.name, country: company.country } };
};
