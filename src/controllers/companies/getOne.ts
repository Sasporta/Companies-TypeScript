import { Request } from 'express';

import CompanyModule from '../../modules/Company';
import { Company } from '../../entities/Company';

export const getCompany = async ({ params: { id: uuid } }: Request) => {
  let company: Company;

  company = await CompanyModule.getItemFromCache(uuid);

  if (!company) {
    company = await CompanyModule.getOne(uuid, 404);

    await CompanyModule.setItemInCache(uuid, company);
  }

  return {
    statusCode: 200,
    content: {
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    },
  };
};
