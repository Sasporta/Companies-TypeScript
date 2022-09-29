import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { validateAllParamsExists } from '../helpers';

export const createEmployeeB = async ({
  body: { name, title, companyUuid, managerUuid },
}: Request) => {
  validateAllParamsExists(name, title, companyUuid);

  const { id: company_id } = await findOrThrow(Company, companyUuid, 422);

  const { id: manager_id } =
    typeof managerUuid === 'string'
      ? await findOrThrow(Employee, managerUuid, 422)
      : { id: null };

  const employee = Employee.create({ name, title, company_id, manager_id });

  await employee.save();

  return {
    statusCode: 201,
    content: {
      uuid: employee.uuid,
      name: employee.name,
      title: employee.title,
    },
  };
};
