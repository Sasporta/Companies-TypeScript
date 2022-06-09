import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { validateAllParamsExists } from '../helpers';

export const createEmployee = async ({ body: { name, age, companyUuid, managerUuid } }: Request) => {
  validateAllParamsExists(name, age, companyUuid);

  const { id: company_id } = await findOrThrow(Company, companyUuid, 422);

  const { id: manager_id } = typeof managerUuid === 'string' ? await findOrThrow(Employee, managerUuid, 422) : { id: null };

  const employee = Employee.create({ name, age, company_id, manager_id });

  await employee.save();

  return { statusCode: 201, content: { uuid: employee.uuid, name: employee.name, age: employee.age } };
};
