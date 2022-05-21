import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { Company } from '../../entities/Company';

export const getCompany = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;

  try {
    const company = await Company.findOneBy({ uuid });

    if (!company) { return errorHandler(res, 404); }

    return res.status(200).json(Company.toJson(company));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
