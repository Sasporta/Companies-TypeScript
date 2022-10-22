import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Company from '../../../../services/Company';
import { RouteHandler } from '../../../../types/global';
import { CompanyPostgres } from '../../../../services/Postgres';

export const updateCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
      body: { name, country },
    } = req;

    const company = await CompanyPostgres.edit({ uuid, name, country });

    if (!company) {
      throw { status: 404, entity: 'company', uuid };
    }

    await Promise.all([
      Redis.remove(Company.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(Company.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(200).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
