import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { CompanyDataManager } from '../../services/Data/TypeORM';
import CompanyService from '../../services/businessLogic/Company';

export const updateCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
      body: { name, country },
    } = req;

    const company = await CompanyDataManager.edit({ uuid, name, country });

    if (!company) {
      throw { status: 404, entity: 'company', uuid };
    }

    await Promise.all([
      Redis.remove(CompanyService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(CompanyService.REDIS_LIST_PREFIX_KEY),
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
