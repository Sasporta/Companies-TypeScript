import { Request, Response } from 'express';

import { findOrThrow } from '../helpers';
import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const getCompany = async ({ params: { id: uuid } }: Request, res: Response) => {
  try {
    const company = await findOrThrow(Company, uuid, 404);

    return res.status(200).json(format(company));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
