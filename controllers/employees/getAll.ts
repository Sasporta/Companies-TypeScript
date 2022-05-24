import { Request } from 'express';

import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

export const getEmployees = async ({ query: { companyUuid, managerUuid } }: Request) => {
  let query = { company_id: undefined, manager_id: undefined };

  if (typeof companyUuid === 'string') {
    const company = await Company.findOneBy({ uuid: companyUuid });

    if (company) { query.company_id = company.id; }
  }
  if (typeof managerUuid === 'string') {
    const manager = await Employee.findOneBy({ uuid: managerUuid });

    if (manager) { query.manager_id = manager.id; }
  }

  const employees = await Employee.find({ where: { ...query } });

  return { statusCode: 200, content: employees.map(e => format(e)) };
};
