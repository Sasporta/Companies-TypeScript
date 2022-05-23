import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const updateCompany = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;
  const { name, country } = req.body;

  if (!name && !country) return errorHandler(res, 422 );

  try {
    const company = await Company.findOneBy({ uuid });

    if (!company) { return errorHandler(res, 404); }

    Object.keys(req.body).forEach(param => company[param] = req.body[param]);

    await company.save();

    return res.status(200).json(format(company));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
