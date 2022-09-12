import { NextFunction, Request, Response } from 'express';

import CompanyModule from '../../modules/Company';
import { Company } from '../../entities/Company';
import Validation from '../../modules/Validation';

export const createCompany = async (
  { body: { name, country } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Validation.allParamsExists(name, country);

    const company = Company.create({ name, country });

    await company.save();

    await CompanyModule.removeAllListsFromCache();

    return res.status(201).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
