import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import {
  CompanyDataManager,
  EmployeeDataManager,
} from '../../services/Data/TypeORM';

export const createEmployee: RouteHandler = async (
  { body: { name, age, companyUuid, managerUuid } },
  res,
  next,
) => {
  try {
    EmployeeService.allParamsExists(name, age, companyUuid);

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

    const employee = await EmployeeDataManager.save({
      name,
      age,
      company_id,
      manager_id,
    });

    await EmployeeService.createCount(employee.uuid, companyUuid, managerUuid);

    await Redis.removeAll(EmployeeService.REDIS_LIST_KEY);

    return res
      .status(201)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
