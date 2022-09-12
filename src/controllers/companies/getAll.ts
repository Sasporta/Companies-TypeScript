import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';
import { getAllCompaniesQuery } from '../../pgQueries/companies/getAll';

export const getCompanies: RouteHandler = async (
  { query: { limit } },
  res,
  next,
) => {
  try {
    let companies: Company[];

    const resultsLimit = Validation.limit(+limit);

    companies = await CompanyModule.getListFromCache(resultsLimit);

    if (!companies) {
      companies = await getAllCompaniesQuery(resultsLimit);

      await CompanyModule.setListInCache(resultsLimit, companies);
    }

    return res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
