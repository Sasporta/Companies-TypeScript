import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Rabbit from '../../../../services/rabbitMQ';
import Employee from '../../../../services/Employee';
import { RouteHandler } from '../../../../types/global';
import {
  CompanyPostgres,
  EmployeePostgres,
} from '../../../../services/Postgres';

export const createEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      body: { name, title, companyUuid, managerUuid },
    } = req;

    const company = await CompanyPostgres.getOne(companyUuid);

    if (!company) {
      throw { status: 422, entity: 'company', uuid: companyUuid };
    }

    const company_id = company.id;

    let manager_id: number;

    if (typeof managerUuid === 'string') {
      const manager = await EmployeePostgres.getOne(managerUuid);

      if (!manager) {
        throw { status: 422, entity: 'employee', uuid: managerUuid };
      }

      manager_id = manager.id;
    } else {
      manager_id = null;
    }

    const [employee] = await Promise.all([
      EmployeePostgres.save({ name, title, company_id, manager_id }),
      Redis.removeAll(Employee.REDIS_LIST_KEY),
    ]);

    Rabbit.send({
      action: 'create',
      uuid: employee.uuid,
      companyUuid,
      futureManagerUuid: managerUuid,
    });

    return res.status(201).json({
      uuid: employee.uuid,
      name: employee.name,
      title: employee.title,
    });
  } catch (error) {
    next(error);
  }
};
