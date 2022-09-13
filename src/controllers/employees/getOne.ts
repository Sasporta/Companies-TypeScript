import Redis from '../../modules/Redis';
import { RouteHandler } from '../../types/global';
import { Employee } from '../../entities/Employee';
import EmployeeModule from '../../modules/Employee';

export const getEmployee: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    let employee: Employee;

    employee = await Redis.get(EmployeeModule.REDIS_ITEM_KEY + uuid);

    if (!employee) {
      employee = await EmployeeModule.getOne(uuid, 404);

      await Redis.set(EmployeeModule.REDIS_ITEM_KEY + uuid, employee);
    }

    return res
      .status(200)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
