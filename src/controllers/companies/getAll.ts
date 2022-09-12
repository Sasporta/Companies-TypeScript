import { NextFunction, Request, Response } from 'express';

import CompanyModule from '../../modules/Company';
import { Company } from '../../entities/Company';
import Validation from '../../modules/Validation';
import { getAllCompaniesQuery } from '../../pgQueries/companies/getAll';

export const getCompanies = async (
  { query: { limit } }: Request,
  res: Response,
  next: NextFunction,
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
