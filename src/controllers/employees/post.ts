import Redis from '../../modules/Redis';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import { Employee } from '../../entities/Employee';
import EmployeeModule from '../../modules/Employee';

export const createEmployee: RouteHandler = async (
  { body: { name, age, companyUuid, managerUuid } },
  res,
  next,
) => {
  try {
    EmployeeModule.allParamsExists(name, age, companyUuid);

    const { id: company_id } = await CompanyModule.getOne(companyUuid, 422);

    const { id: manager_id } =
      typeof managerUuid === 'string'
        ? await EmployeeModule.getOne(managerUuid, 422)
        : { id: null };

    const employee = Employee.create({ name, age, company_id, manager_id });

    await employee.save();

    await Redis.removeAll(EmployeeModule.REDIS_LIST_KEY);

    return res
      .status(201)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
