import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Company from '../../../../services/Company';
import { RouteHandler } from '../../../../types/global';
import { CompanyEntity } from '../../../../entities/Company';

export const getCompanies: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      query: { limit },
    } = req;

    let companies: CompanyEntity[];

    companies = await Redis.get(Company.REDIS_LIST_KEY + limit);

    if (!companies) {
      companies = await Company.getAll(limit as unknown as number);

      await Redis.set(Company.REDIS_LIST_KEY + limit, companies);
    }

    return res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
