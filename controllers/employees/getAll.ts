import { Request, Response } from 'express';

import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

export const getEmployees = async ({ query: { companyUuid, managerUuid } }: Request, res: Response) => {
  let query = { company_id: undefined, manager_id: undefined };

  try {
    if (typeof companyUuid === 'string') {
      const company = await Company.findOneBy({ uuid: companyUuid });

      if (company) { query.company_id = company.id; }
    }
    if (typeof managerUuid === 'string') {
      const manager = await Employee.findOneBy({ uuid: managerUuid });

      if (manager) { query.manager_id = manager.id; }
    }

    const employees = await Employee.find({ where: { ...query } });

    return res.status(200).json(employees.map(e => format(e)));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
