import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import { CompanyDataManager } from '../../services/Data/TypeORM';
import CompanyService from '../../services/businessLogic/Company';

export const getCompany: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    let company: Company;

    company = await Redis.get(CompanyService.REDIS_ITEM_KEY + uuid);

    if (!company) {
      company = await CompanyDataManager.getOne(uuid);

      if (!company) {
        throw { status: 404, entity: 'company', uuid };
      }

      await Redis.set(CompanyService.REDIS_ITEM_KEY + uuid, company);
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
