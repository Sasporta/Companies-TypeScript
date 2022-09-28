import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { CompanyDataManager } from '../../services/Data/TypeORM';
import CompanyService from '../../services/businessLogic/Company';

export const deleteCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    const isDeleted = await CompanyDataManager.destroy(uuid);

    if (!isDeleted) {
      throw { status: 404, entity: 'company',  };
    }

    await Promise.all([
      Redis.remove(CompanyService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(CompanyService.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
