import { Request } from 'express';

import CompanyModule from '../../modules/Company';

export const deleteCompany = async ({ params: { id: uuid } }: Request) => {
  await CompanyModule.destroy(uuid);

  await Promise.all([
    CompanyModule.removeItemFromCache(uuid),
    CompanyModule.removeAllListsFromCache(),
  ]);

  return { statusCode: 204 };
};
