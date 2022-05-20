import { Request } from 'express';

import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { findOrThrow, update, validateAtLeastOneParamExists } from '../helpers';

export const updateEmployee = async ({ params: { id: uuid }, body: { companyUuid, managerUuid, name, age } }: Request) => {
  validateAtLeastOneParamExists(name, age, companyUuid, managerUuid);

  const employee = await findOrThrow(Employee, uuid, 404);

  const { id: company_id } = typeof companyUuid === 'string' ? await findOrThrow(Company, companyUuid, 422) : { id: undefined };

  const { id: manager_id } = typeof managerUuid === 'string' ? await findOrThrow(Employee, managerUuid, 422) : managerUuid === null ? { id: null } : { id: undefined };

  update(employee, { name, age, company_id, manager_id });

  await employee.save();

  return { statusCode: 200, content: format(employee) };
};
