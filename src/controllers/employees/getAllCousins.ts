import { NextFunction, Request, Response } from 'express';

import Validation from '../../modules/Validation';
import EmployeeModule from '../../modules/Employee';
import { Employee } from '../../entities/Employee';
import { getAllCousinsQuery } from '../../pgQueries/employees/getAllCousins';

export const getCousins = async (
  { params: { id: uuid }, query: { limit } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let cousins: Employee[];

    const resultsLimit = Validation.limit(+limit);

    const stringifyParams = EmployeeModule.stringifyParams({
      uuid,
      path: 'cousins',
      limit: resultsLimit,
    });

    cousins = await EmployeeModule.getListFromCache(stringifyParams);

    if (!cousins) {
      cousins = await getAllCousinsQuery(uuid, resultsLimit);

      await EmployeeModule.setListInCache(stringifyParams, cousins);
    }

    return res.status(200).json(cousins);
  } catch (error) {
    next(error);
  }
};
