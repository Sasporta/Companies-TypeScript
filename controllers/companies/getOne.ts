import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const getCompany = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;

  try {
    const company = await Company.findOneBy({ uuid });

    if (!company) { return errorHandler(res, 404); }

    return res.status(200).json(format(company));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
