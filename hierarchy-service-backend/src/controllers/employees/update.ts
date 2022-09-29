import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import {
  CompanyDataManager,
  EmployeeDataManager,
} from '../../services/Data/TypeORM';

export const updateEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
      body: { companyUuid, managerUuid, name, title },
    } = req;

    let company_id: number;

    if (typeof companyUuid === 'string') {
      const company = await CompanyDataManager.getOne(companyUuid);

      if (!company) {
        throw { status: 422, entity: 'company', uuid: companyUuid };
      }

      company_id = company.id;
    }

    let manager_id: number;

    if (typeof managerUuid === 'string') {
      const manager = await EmployeeDataManager.getOne(managerUuid);

      if (!manager) {
        throw { status: 422, entity: 'employee', uuid: managerUuid };
      }

      manager_id = manager.id;
    } else if (managerUuid === null) {
      manager_id = null;
    }

    if (company_id || manager_id || manager_id === null) {
      await EmployeeService.updateCounts(uuid, companyUuid, managerUuid);
    }

    const employee = await EmployeeDataManager.edit({
      uuid,
      name,
      title,
      company_id,
      manager_id,
    });

    if (!employee) {
      throw { status: 404, entity: 'employee', uuid };
    }

    await Promise.all([
      Redis.remove(EmployeeService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(EmployeeService.REDIS_LIST_KEY),
    ]);

    return res.status(200).json({
      uuid: employee.uuid,
      name: employee.name,
      title: employee.title,
    });
  } catch (error) {
    next(error);
  }
};
