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

    employee = await EmployeeModule.getItemFromCache(uuid);

    if (!employee) {
      employee = await EmployeeModule.getOne(uuid, 404);

      await EmployeeModule.setItemInCache(uuid, employee);
    }

    return res
      .status(200)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
