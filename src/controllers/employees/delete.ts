import { NextFunction, Request, Response } from 'express';

import EmployeeModule from '../../modules/Employee';

export const deleteEmployee = async (
  { params: { id: uuid } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await EmployeeModule.destroy(uuid);

    await Promise.all([
      EmployeeModule.removeItemFromCache(uuid),
      EmployeeModule.removeAllListsFromCache(),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
