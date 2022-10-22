import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Employee from '../../../../services/Employee';
import { RouteHandler } from '../../../../types/global';
import { EmployeeEntity } from '../../../../entities/Employee';

export const getEmployees: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      query: { companyUuid, managerUuid, limit },
    } = req;

    let employees: EmployeeEntity[];

    const stringifyParams = Employee.stringifyParams({
      companyUuid: companyUuid as string,
      managerUuid: managerUuid as string,
      limit: limit as unknown as number,
    });

    employees = await Redis.get(Employee.REDIS_LIST_KEY + stringifyParams);

    if (!employees) {
      employees = await Employee.getAll(
        companyUuid as string,
        managerUuid as string,
        limit as unknown as number,
      );

      await Redis.set(Employee.REDIS_LIST_KEY + stringifyParams, employees);
    }

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
