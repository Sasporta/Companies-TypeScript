import { NextFunction, Request, Response } from 'express';

import Validation from '../../modules/Validation';
import { Employee } from '../../entities/Employee';
import EmployeeModule from '../../modules/Employee';
import { getAllEmployeesQuery } from '../../pgQueries/employees/getAll';

export const getEmployees = async (
  { query: { companyUuid, managerUuid, limit } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    companyUuid = companyUuid as string;
    managerUuid = managerUuid as string;

    let employees: Employee[];

    const resultsLimit = Validation.limit(+limit);

    const stringifyParams = EmployeeModule.stringifyParams({
      companyUuid,
      managerUuid,
      limit: resultsLimit,
    });

    employees = await EmployeeModule.getListFromCache(stringifyParams);

    if (!employees) {
      employees = await getAllEmployeesQuery(
        companyUuid,
        managerUuid,
        resultsLimit,
      );

      await EmployeeModule.setListInCache(stringifyParams, employees);
    }

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
