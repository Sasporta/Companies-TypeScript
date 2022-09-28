import { validationResult } from 'express-validator';

import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import {
  CompanyDataManager,
  EmployeeDataManager,
} from '../../services/Data/TypeORM';

export const createEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      body: { name, title, companyUuid, managerUuid },
    } = req;

    const company = await CompanyDataManager.getOne(companyUuid);

    if (!company) {
      throw { status: 422, entity: 'company', uuid: companyUuid };
    }

    const company_id = company.id;

    let manager_id: number;

    if (typeof managerUuid === 'string') {
      const manager = await EmployeeDataManager.getOne(managerUuid);

      if (!manager) {
        throw { status: 422, entity: 'employee', uuid: managerUuid };
      }

      manager_id = manager.id;
    } else {
      manager_id = null;
    }

    const [employee] = await Promise.all([
      EmployeeDataManager.save({ name, title, company_id, manager_id }),
      Redis.removeAll(EmployeeService.REDIS_LIST_KEY),
    ]);

    await EmployeeService.createCount(employee.uuid, companyUuid, managerUuid);

    return res.status(201).json({
      uuid: employee.uuid,
      name: employee.name,
      title: employee.title,
    });
  } catch (error) {
    next(error);
  }
};
