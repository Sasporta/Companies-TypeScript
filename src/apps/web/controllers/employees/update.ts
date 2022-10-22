import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Rabbit from '../../../../services/rabbitMQ';
import Employee from '../../../../services/Employee';
import { RouteHandler } from '../../../../types/global';
import {
  CompanyPostgres,
  EmployeePostgres,
} from '../../../../services/Postgres';

export const updateEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
      body: { companyUuid, managerUuid, name, title },
    } = req;

    let company_id: number;

    if (typeof companyUuid === 'string') {
      const company = await CompanyPostgres.getOne(companyUuid);

      if (!company) {
        throw { status: 422, entity: 'company', uuid: companyUuid };
      }

      company_id = company.id;
    }

    let manager_id: number;

    if (typeof managerUuid === 'string') {
      const manager = await EmployeePostgres.getOne(managerUuid);

      if (!manager) {
        throw { status: 422, entity: 'employee', uuid: managerUuid };
      }

      manager_id = manager.id;
    } else if (managerUuid === null) {
      manager_id = null;
    }

    if (company_id || manager_id || manager_id === null) {
      const previousManager = await Employee.getParent(uuid);

      Rabbit.send({
        action: 'update',
        employeeUuid: uuid,
        companyUuid,
        futureManagerUuid: managerUuid,
        previousManagerUuid: previousManager?.uuid,
      });
    }

    const employee = await EmployeePostgres.edit({
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
      Redis.remove(Employee.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(Employee.REDIS_LIST_KEY),
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
