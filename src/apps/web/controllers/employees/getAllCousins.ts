import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Employee from '../../../../services/Employee';
import { RouteHandler } from '../../../../types/global';
import { EmployeeEntity } from '../../../../entities/Employee';

export const getCousins: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
      query: { limit },
    } = req;

    let cousins: EmployeeEntity[];

    const stringifyParams = Employee.stringifyParams({
      uuid,
      path: 'cousins',
      limit: limit as unknown as number,
    });

    cousins = await Redis.get(Employee.REDIS_LIST_KEY + stringifyParams);

    if (!cousins) {
      cousins = await Employee.getAllCousins(uuid, limit as unknown as number);

      await Redis.set(Employee.REDIS_LIST_KEY + stringifyParams, cousins);
    }

    return res.status(200).json(cousins);
  } catch (error) {
    next(error);
  }
};
