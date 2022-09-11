import { Request } from 'express';

import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';

export const updateCompany = async ({
  params: { id: uuid },
  body: { name, country },
}: Request) => {
  Validation.atLeastOneParamExists(name, country);

  const company = await CompanyModule.edit({ uuid, name, country });

  await Promise.all([
    CompanyModule.removeItemFromCache(uuid),
    CompanyModule.removeAllListsFromCache(),
  ]);

  return {
    statusCode: 200,
    content: {
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    },
  };
};
