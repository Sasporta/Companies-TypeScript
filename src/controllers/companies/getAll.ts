import Redis from '../../modules/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import { getAllCompaniesQuery } from '../../pgQueries/companies/getAll';

export const getCompanies: RouteHandler = async (
  { query: { limit } },
  res,
  next,
) => {
  try {
    let companies: Company[];

    const resultsLimit = CompanyModule.limit(+limit);

    companies = await Redis.get(CompanyModule.REDIS_LIST_KEY + resultsLimit);

    if (!companies) {
      companies = await getAllCompaniesQuery(resultsLimit);

      await Redis.set(CompanyModule.REDIS_LIST_KEY + resultsLimit, companies);
    }

    return res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
