import { Request, Response } from 'express';

import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';
import { validateAllParamsExists } from '../helpers';

export const createCompany = async ({ body: { name, country } }: Request, res: Response) => {
  try {
    validateAllParamsExists(name, country);

    const company = Company.create({
      name,
      country,
    });

    await company.save();

    return res.status(201).json(format(company));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
