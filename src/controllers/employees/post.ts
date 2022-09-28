import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import {
  CompanyDataManager,
  EmployeeDataManager,
} from '../../services/Data/TypeORM';

export const createEmployee: RouteHandler = async (
  { body: { name, title, companyUuid, managerUuid } },
  res,
  next,
) => {
  try {
    EmployeeService.allParamsExists(name, title, companyUuid);

    const company = await CompanyDataManager.getOne(companyUuid);

    !company && EmployeeService.throwError(422);

    const company_id = company.id;

    let manager_id: number;

    if (typeof managerUuid === 'string') {
      const manager = await EmployeeDataManager.getOne(managerUuid);

      !manager && EmployeeService.throwError(422);

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
