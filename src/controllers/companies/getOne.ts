import { NextFunction, Request, Response } from 'express';

import CompanyModule from '../../modules/Company';
import { Company } from '../../entities/Company';

export const getCompany = async (
  { params: { id: uuid } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let company: Company;

    company = await CompanyModule.getItemFromCache(uuid);

    if (!company) {
      company = await CompanyModule.getOne(uuid, 404);

      await CompanyModule.setItemInCache(uuid, company);
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
