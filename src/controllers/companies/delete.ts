import { NextFunction, Request, Response } from 'express';

import CompanyModule from '../../modules/Company';

export const deleteCompany = async (
  { params: { id: uuid } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CompanyModule.destroy(uuid);

    await Promise.all([
      CompanyModule.removeItemFromCache(uuid),
      CompanyModule.removeAllListsFromCache(),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
