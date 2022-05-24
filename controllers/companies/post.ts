import { Request } from 'express';

import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';
import { validateAllParamsExists } from '../helpers';

export const createCompany = async ({ body: { name, country } }: Request) => {
  validateAllParamsExists(name, country);

  const company = Company.create({
    name,
    country,
  });

  await company.save();

  return { statusCode: 201, content: format(company) };
};
