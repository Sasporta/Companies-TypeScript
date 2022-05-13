import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

export const updateEmployee = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;
  const { companyUuid, managerUuid, name, age } = req.body;

  if (!name && !age && !companyUuid && !managerUuid) return errorHandler(res, 422);

  let update = { name, age, companyId: undefined, managerId: undefined };

  try {
    const employee = await Employee.findOneBy({ uuid });

    if (!employee) { return errorHandler(res, 404); }

    if (companyUuid) {
      const company = await Company.findOneBy({ uuid: companyUuid });

      if (!company) { return errorHandler(res, 422); }

      update.companyId = company.id;
    }

    if (managerUuid || managerUuid === null) {
      if (managerUuid) {
        const manager = await Employee.findOneBy({ uuid: managerUuid });

        if (!manager) { return errorHandler(res, 422); }

        update.managerId = manager.id;
      }
      else {
        update.managerId = null;
      }
    }

    Object.keys(req.body).forEach(param => employee[param] = req.body[param]);

    await employee.save();

    return res.status(200).json(Employee.toJson(employee));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
