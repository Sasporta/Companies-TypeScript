import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

export const updateEmployee = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;
  const { companyUuid, managerUuid, name, age } = req.body;

  if (!name && !age && !companyUuid && managerUuid === undefined) return errorHandler(res, 422);

  let update = { name, age, company_id: undefined, manager_id: undefined };

  try {
    const employee = await Employee.findOneBy({ uuid });

    if (!employee) { return errorHandler(res, 404); }

    if (companyUuid) {
      const company = await Company.findOneBy({ uuid: companyUuid });

      if (!company) { return errorHandler(res, 422); }

      update.company_id = company.id;
    }

    if (managerUuid || managerUuid === null) {
      if (managerUuid) {
        const manager = await Employee.findOneBy({ uuid: managerUuid });

        if (!manager) { return errorHandler(res, 422); }

        update.manager_id = manager.id;
      }
      else {
        update.manager_id = null;
      }
    }

    Object.keys(update).forEach(param => employee[param] = update[param]);

    await employee.save();

    return res.status(200).json(format(employee));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
