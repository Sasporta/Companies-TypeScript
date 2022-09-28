import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { Employee } from '../../entities/Employee';
import EmployeeService from '../../services/businessLogic/Employee';

export const getCousins: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
      query: { limit },
    } = req;

    let cousins: Employee[];

    const stringifyParams = EmployeeService.stringifyParams({
      uuid,
      path: 'cousins',
      limit: limit as unknown as number,
    });

    cousins = await Redis.get(EmployeeService.REDIS_LIST_KEY + stringifyParams);

    if (!cousins) {
      cousins = await EmployeeService.getAllCousins(
        uuid,
        limit as unknown as number,
      );

      await Redis.set(
        EmployeeService.REDIS_LIST_KEY + stringifyParams,
        cousins,
      );
    }

    return res.status(200).json(cousins);
  } catch (error) {
    next(error);
  }
};
