import { validationResult } from 'express-validator';

import Redis from '../../../../services/Redis';
import Rabbit from '../../../../services/rabbitMQ';
import Employee from '../../../../services/Employee';
import { RouteHandler } from '../../../../types/global';
import { EmployeePostgres } from '../../../../services/Postgres';

export const deleteEmployee: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    const [manager, isDeleted] = await Promise.all([
      Employee.getParent(uuid),
      EmployeePostgres.destroy(uuid),
    ]);

    if (!isDeleted) {
      throw { status: 404, entity: 'employee', uuid };
    }

    Rabbit.send({ action: 'delete', uuid, previousManagerUuid: manager?.uuid });

    await Promise.all([
      Redis.remove(Employee.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(Employee.REDIS_LIST_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
