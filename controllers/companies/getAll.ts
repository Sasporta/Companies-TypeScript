import { Request, Response } from 'express';

import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();

    return res.status(200).json(companies.map(c => format(c)));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
