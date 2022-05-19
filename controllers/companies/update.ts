import { Request, Response } from 'express';

import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';
import { findOrThrow, update, validateAtLeastOneParamExists } from '../helpers';

export const updateCompany = async ({ params: { id: uuid }, body: { name, country } }: Request, res: Response) => {
  try {
    validateAtLeastOneParamExists(name, country);

    const company = await findOrThrow(Company, uuid, 404);

    update(company, { name, country });

    await company.save();

    return res.status(200).json(format(company));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
