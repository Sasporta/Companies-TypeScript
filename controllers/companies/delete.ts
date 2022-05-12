import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { Company } from '../../entities/Company';

export const deleteCompany = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;

  try {
    const company = await Company.findOneBy({ uuid });

    if (!company) { return errorHandler(res, 404); }

    company.remove()

    return res.status(204).json();
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
