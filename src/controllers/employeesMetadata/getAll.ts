import { NextFunction, Request, Response } from 'express';

import Validation from '../../modules/Validation';
import EmployeeMetadata from '../../models/EmployeeMetaData';

export const getEmployeesMetadata = async (
  { query: { companyUuid, limit } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const whereStatement = companyUuid ? { companyUuid } : {};

    const resultsLimit = Validation.limit(+limit);

    const employees = await EmployeeMetadata.find(whereStatement).limit(
      resultsLimit,
    );

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
