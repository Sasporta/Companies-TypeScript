import { NextFunction, Request, Response } from 'express';

import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';
import EmployeeModule from '../../modules/Employee';
import { Employee } from '../../entities/Employee';

export const createEmployee = async (
  { body: { name, age, companyUuid, managerUuid } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Validation.allParamsExists(name, age, companyUuid);

    const { id: company_id } = await CompanyModule.getOne(companyUuid, 422);

    const { id: manager_id } =
      typeof managerUuid === 'string'
        ? await EmployeeModule.getOne(managerUuid, 422)
        : { id: null };

    const employee = Employee.create({ name, age, company_id, manager_id });

    await employee.save();

    await EmployeeModule.removeAllListsFromCache();

    return res
      .status(201)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
