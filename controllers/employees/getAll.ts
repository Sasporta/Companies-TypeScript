import { Request } from 'express';

import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

export const getEmployees = async ({ query: { companyUuid, managerUuid } }: Request) => {
  const company = typeof companyUuid === 'string' ? await Company.findOneBy({ uuid: companyUuid }) : null;

  const manager = typeof managerUuid === 'string' ? await Employee.findOneBy({ uuid: managerUuid }) : null;

  const employees = await Employee.find({ where: { company_id: company?.id , manager_id: manager?.id } });

  return { statusCode: 200, content: employees.map(e => format(e)) };
};
