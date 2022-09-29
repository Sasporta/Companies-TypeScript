import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import CompanyService from '../../services/businessLogic/Company';
import { CompanyDataManager } from '../../services/Data/TypeORM';

export const createCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      body: { name, country },
    } = req;

    const [company] = await Promise.all([
      CompanyDataManager.save({ name, country }),
      Redis.removeAll(CompanyService.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(201).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
