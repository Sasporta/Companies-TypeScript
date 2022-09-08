import { Request } from 'express';

import { deleteOrThrow404 } from '../helpers';
import { Company } from '../../entities/Company';

export const deleteCompanyB = async ({ params: { id: uuid } }: Request) => {
  await deleteOrThrow404(Company, uuid);

  return { statusCode: 204 };
};
