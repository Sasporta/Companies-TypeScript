import { Request } from 'express';

import EmployeeModel from '../../models/Employee';
import { Employee } from '../../entities/Employee';

export const getEmployee = async ({ params: { id: uuid } }: Request) => {
  let employee: Employee;

  employee = await EmployeeModel.getItemFromCache(uuid);

  if (!employee) {
    employee = await EmployeeModel.getOne(uuid, 404);

    await EmployeeModel.setItemInCache(uuid, employee);
  }

  return {
    statusCode: 200,
    content: { uuid: employee.uuid, name: employee.name, age: employee.age },
  };
};
