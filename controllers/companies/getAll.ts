import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();

    return res.status(200).json(companies.map(c => format(c)));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
