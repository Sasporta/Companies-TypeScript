import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Company from '../../../../services/Company';
import { RouteHandler } from '../../../../types/global';
import { CompanyPostgres } from '../../../../services/Postgres';

export const createCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      body: { name, country },
    } = req;

    const [company] = await Promise.all([
      CompanyPostgres.save({ name, country }),
      Redis.removeAll(Company.REDIS_LIST_PREFIX_KEY),
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
