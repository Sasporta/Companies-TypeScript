import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { EmployeeDataManager } from '../../services/Data/TypeORM';
import EmployeeService from '../../services/businessLogic/Employee';

export const deleteEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    await EmployeeService.deleteCount(uuid);

    const isDeleted = await EmployeeDataManager.destroy(uuid);

    if (!isDeleted) {
      throw { status: 404, entity: 'employee', uuid };
    }

    await Promise.all([
      Redis.remove(EmployeeService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(EmployeeService.REDIS_LIST_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
