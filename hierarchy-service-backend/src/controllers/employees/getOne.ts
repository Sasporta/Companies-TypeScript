import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { Employee } from '../../entities/Employee';
import { EmployeeDataManager } from '../../services/Data/TypeORM';
import EmployeeService from '../../services/businessLogic/Employee';

export const getEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    let employee: Employee;

    employee = await Redis.get(EmployeeService.REDIS_ITEM_KEY + uuid);

    if (!employee) {
      employee = await EmployeeDataManager.getOne(uuid);

      if (!employee) {
        throw { status: 404, entity: 'employee', uuid };
      }

      await Redis.set(EmployeeService.REDIS_ITEM_KEY + uuid, employee);
    }

    return res.status(200).json({
      uuid: employee.uuid,
      name: employee.name,
      title: employee.title,
    });
  } catch (error) {
    next(error);
  }
};
