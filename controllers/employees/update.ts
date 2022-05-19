import { Request, Response } from 'express';

import { format } from '../jsons/employees';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { findOrThrow, update, validateAtLeastOneParamExists } from '../helpers';

export const updateEmployee = async ({ params: { id: uuid }, body: { companyUuid, managerUuid, name, age } }: Request, res: Response) => {
  let incomingUpdates = { name, age, company_id: undefined, manager_id: undefined };

  try {
    validateAtLeastOneParamExists(name, age, companyUuid, managerUuid);

    const employee = await findOrThrow(Employee, uuid, 404);

    if (companyUuid) {
      const company = await findOrThrow(Company, companyUuid, 422);

      incomingUpdates.company_id = company.id;
    }

    if (managerUuid !== undefined) {
      if (managerUuid === null) incomingUpdates.manager_id = null;
      else {
        const manager = await findOrThrow(Employee, managerUuid, 422);

        incomingUpdates.manager_id = manager.id;
      }
    }

    update(employee, incomingUpdates);

    await employee.save();

    return res.status(200).json(format(employee));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
