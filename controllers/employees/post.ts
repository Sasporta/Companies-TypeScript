import { Request, Response } from 'express';

import { findOrThrow } from '../helpers';
import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { validateAllParamsExists } from '../helpers';

export const createEmployee = async ({ body: { name, age, managerUuid, companyUuid } }: Request, res: Response) => {
  let manager_id = null;

  try {
    validateAllParamsExists(name, age, companyUuid);

    const company = await findOrThrow(Company, companyUuid, 422);

    if (managerUuid) {
      const manager = await findOrThrow(Employee, managerUuid, 422);

      manager_id = manager.id;
    }

    const employee = Employee.create({
      name,
      age,
      manager_id,
      company_id: company.id,
    });

    await employee.save();

    return res.status(201).json(format(employee));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
