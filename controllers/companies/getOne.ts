import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const getCompany = async ({ params: { id: uuid } }: Request) => {
    const company = await findOrThrow(Company, uuid, 404);

  return { statusCode: 200, content: format(company) };
};
