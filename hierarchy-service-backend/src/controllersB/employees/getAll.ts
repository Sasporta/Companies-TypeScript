import { Request } from 'express';

import { Company } from '../../entities/Company';
import { findOrThrow, validateLimit } from '../helpers';
import { Employee } from '../../entities/Employee';

export const getEmployeesB = async ({
  query: { companyUuid, managerUuid, limit },
}: Request) => {
  let employees: Employee[];

  if (companyUuid && managerUuid) {
    const company = await findOrThrow(Company, companyUuid.toString(), 404);

    const manager = await findOrThrow(Employee, managerUuid.toString(), 404);

    employees = await Employee.find({
      where: {
        company_id: company.id,
        manager_id: manager.id,
      },
      select: {
        uuid: true,
        name: true,
        title: true,
      },
      take: validateLimit(+limit),
    });
  } else if (companyUuid && !managerUuid) {
    const company = await findOrThrow(Employee, companyUuid.toString(), 404);

    employees = await Employee.find({
      where: {
        company_id: company.id,
      },
      select: {
        uuid: true,
        name: true,
        title: true,
      },
      take: validateLimit(+limit),
    });
  } else if (!companyUuid && managerUuid) {
    const manager = await findOrThrow(Employee, managerUuid.toString(), 404);

    employees = await Employee.find({
      where: {
        manager_id: manager.id,
      },
      select: {
        uuid: true,
        name: true,
        title: true,
      },
      take: validateLimit(+limit),
    });
  } else {
    employees = await Employee.find({
      select: {
        uuid: true,
        name: true,
        title: true,
      },
      take: validateLimit(+limit),
    });
  }

  return { statusCode: 200, content: employees };
};
