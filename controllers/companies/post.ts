import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const createCompany = async (req: Request, res: Response) => {
  const {
    name,
    country,
  } = req.body;

  if (!name || !country) return errorHandler(res, 422);

  const company = Company.create({
    name,
    country,
  });

  try {
    await company.save();

    return res.status(201).json(format(company));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
