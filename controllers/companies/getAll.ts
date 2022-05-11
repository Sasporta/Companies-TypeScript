import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { Company } from '../../entities/Company';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();

    return res.status(200).json(Company.arrayToJson(companies));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
