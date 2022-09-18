import Redis from '../../services/Data/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyService from '../../services/businessLogic/Company';
import { getAllCompaniesQuery } from '../../pgQueries/companies/getAll';

export const getCompanies: RouteHandler = async (
  { query: { limit } },
  res,
  next,
) => {
  try {
    let companies: Company[];

    const resultsLimit = CompanyService.limit(+limit);

    companies = await Redis.get(CompanyService.REDIS_LIST_KEY + resultsLimit);

    if (!companies) {
      companies = await getAllCompaniesQuery(resultsLimit);

      await Redis.set(CompanyService.REDIS_LIST_KEY + resultsLimit, companies);
    }

    return res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
