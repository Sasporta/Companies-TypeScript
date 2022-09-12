import { NextFunction, Request, Response } from 'express';

import EmployeeMetadataModule from '../../modules/EmployeeMetadata';

export const getEmployeeMetadata = async (
  { params: { id: uuid } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employeeMetadata = await EmployeeMetadataModule.getOne(uuid);

    return res.status(200).json(employeeMetadata);
  } catch (error) {
    next(error);
  }
};
