import { NextFunction, Request, Response } from 'express';

import EmployeeModule from '../../modules/Employee';
import { Employee } from '../../entities/Employee';

export const getEmployee = async (
  { params: { id: uuid } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let employee: Employee;

    employee = await EmployeeModule.getItemFromCache(uuid);

    if (!employee) {
      employee = await EmployeeModule.getOne(uuid, 404);

      await EmployeeModule.setItemInCache(uuid, employee);
    }

    return res
      .status(200)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
