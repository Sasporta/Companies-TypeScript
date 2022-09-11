import { Request } from 'express';

import CompanyModule from '../../modules/Company';
import { Company } from '../../entities/Company';
import Validation from '../../modules/Validation';

export const createCompany = async ({ body: { name, country } }: Request) => {
  Validation.allParamsExists(name, country);

  const company = Company.create({ name, country });

  await company.save();

  await CompanyModule.removeAllListsFromCache();

  return {
    statusCode: 201,
    content: {
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    },
  };
};
