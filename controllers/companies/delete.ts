import { Request, Response } from 'express';

import { findOrThrow } from '../helpers';
import { Company } from '../../entities/Company';

export const deleteCompany = async ({ params: { id: uuid } }: Request, res: Response) => {
  try {
    const company = await findOrThrow(Company, uuid, 404);

    company.remove()

    return res.status(204).json();
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
