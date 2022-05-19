import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { validateAllParamsExists } from '../helpers';

export const createEmployee = async ({ body: { name, age, managerUuid, companyUuid } }: Request) => {
  let manager_id = null;

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

  return { statusCode: 201, content: format(employee) };
};
