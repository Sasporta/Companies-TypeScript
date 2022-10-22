import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Company from '../../../../services/Company';
import { RouteHandler } from '../../../../types/global';
import { CompanyPostgres } from '../../../../services/Postgres';

export const deleteCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    const isDeleted = await CompanyPostgres.destroy(uuid);

    if (!isDeleted) {
      throw { status: 404, entity: 'company' };
    }

    await Promise.all([
      Redis.remove(Company.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(Company.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
