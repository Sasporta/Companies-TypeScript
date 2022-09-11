import { Request } from 'express';

import CompanyModule from '../../modules/Company';
import { Company } from '../../entities/Company';
import Validation from '../../modules/Validation';
import { getAllCompaniesQuery } from '../../pgQueries/companies/getAll';

export const getCompanies = async ({ query: { limit } }: Request) => {
  let companies: Company[];

  const resultsLimit = Validation.limit(+limit);

  companies = await CompanyModule.getListFromCache(resultsLimit);

  if (!companies) {
    companies = await getAllCompaniesQuery(resultsLimit);

    await CompanyModule.setListInCache(resultsLimit, companies);
  }

  return { statusCode: 200, content: companies };
};
