import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyService from '../../services/businessLogic/Company';

export const getCompanies: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      query: { limit },
    } = req;

    let companies: Company[];

    companies = await Redis.get(CompanyService.REDIS_LIST_KEY + limit);

    if (!companies) {
      companies = await CompanyService.getAll(limit as unknown as number);

      await Redis.set(CompanyService.REDIS_LIST_KEY + limit, companies);
    }

    return res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
