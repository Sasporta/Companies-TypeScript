import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import {
  CompanyDataManager,
  EmployeeDataManager,
} from '../../services/Data/TypeORM';

export const updateEmployee: RouteHandler = async (
  { params: { id: uuid }, body: { companyUuid, managerUuid, name, title } },
  res,
  next,
) => {
  try {
    EmployeeService.atLeastOneParamExists(
      name,
      title,
      companyUuid,
      managerUuid,
    );

    let company_id: number;

    if (typeof companyUuid === 'string') {
      const company = await CompanyDataManager.getOne(companyUuid);

      !company && EmployeeService.throwError(422);

      company_id = company.id;
    }

    let manager_id: number;

    if (typeof managerUuid === 'string') {
      const manager = await EmployeeDataManager.getOne(managerUuid);

      !manager && EmployeeService.throwError(422);

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

    !employee && EmployeeService.throwError(404);

    await Promise.all([
      Redis.remove(EmployeeService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(EmployeeService.REDIS_LIST_KEY),
    ]);

    return res
      .status(200)
      .json({
        uuid: employee.uuid,
        name: employee.name,
        title: employee.title,
      });
  } catch (error) {
    next(error);
  }
};
