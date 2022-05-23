import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

export const createEmployee = async (req: Request, res: Response) => {
  const {
    name,
    age,
    managerUuid,
    companyUuid,
  } = req.body;

  let manager: Employee;

  if (!name || !age || !companyUuid) return errorHandler(res, 422);

  try {
    const company = await Company.findOneBy({ uuid: companyUuid });

    if (!company) { return errorHandler(res, 422); }

    if (managerUuid) {
      manager = await Employee.findOneBy({ uuid: managerUuid });

      if (!manager) { return errorHandler(res, 422); }
    }

    const employee = Employee.create({
      name,
      age,
      manager_id: manager ? manager.id : null,
      company_id: company.id,
    });

    await employee.save();

    return res.status(201).json(format(employee));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
