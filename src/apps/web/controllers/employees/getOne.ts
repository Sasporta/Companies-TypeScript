import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Employee from '../../../../services/Employee';
import { RouteHandler } from '../../../../types/global';
import { EmployeeEntity } from '../../../../entities/Employee';
import { EmployeePostgres } from '../../../../services/Postgres';

export const getEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    let employee: EmployeeEntity;

    employee = await Redis.get(Employee.REDIS_ITEM_KEY + uuid);

    if (!employee) {
      employee = await EmployeePostgres.getOne(uuid);

      if (!employee) {
        throw { status: 404, entity: 'employee', uuid };
      }

      await Redis.set(Employee.REDIS_ITEM_KEY + uuid, employee);
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
