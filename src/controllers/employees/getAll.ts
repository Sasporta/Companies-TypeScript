import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { Employee } from '../../entities/Employee';
import EmployeeService from '../../services/businessLogic/Employee';

export const getEmployees: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      query: { companyUuid, managerUuid, limit },
    } = req;

    let employees: Employee[];

    const stringifyParams = EmployeeService.stringifyParams({
      companyUuid: companyUuid as string,
      managerUuid: managerUuid as string,
      limit: limit as unknown as number,
    });

    employees = await Redis.get(
      EmployeeService.REDIS_LIST_KEY + stringifyParams,
    );

    if (!employees) {
      employees = await EmployeeService.getAll(
        companyUuid as string,
        managerUuid as string,
        limit as unknown as number,
      );

      await Redis.set(
        EmployeeService.REDIS_LIST_KEY + stringifyParams,
        employees,
      );
    }

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
