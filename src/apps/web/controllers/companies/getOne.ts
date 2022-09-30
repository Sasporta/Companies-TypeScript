import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Company from '../../../../services/Company';
import { RouteHandler } from '../../../../types/global';
import { CompanyEntity } from '../../../../entities/Company';
import { CompanyPostgres } from '../../../../services/Postgres';

export const getCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    let company: CompanyEntity;

    company = await Redis.get(Company.REDIS_ITEM_KEY + uuid);

    if (!company) {
      company = await CompanyPostgres.getOne(uuid);

      if (!company) {
        throw { status: 404, entity: 'company', uuid };
      }

      await Redis.set(Company.REDIS_ITEM_KEY + uuid, company);
    }

    return res.status(200).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
