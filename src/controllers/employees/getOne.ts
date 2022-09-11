import { Request } from 'express';

import EmployeeModule from '../../modules/Employee';
import { Employee } from '../../entities/Employee';

export const getEmployee = async ({ params: { id: uuid } }: Request) => {
  let employee: Employee;

  employee = await EmployeeModule.getItemFromCache(uuid);

  if (!employee) {
    employee = await EmployeeModule.getOne(uuid, 404);

    await EmployeeModule.setItemInCache(uuid, employee);
  }

  return {
    statusCode: 200,
    content: { uuid: employee.uuid, name: employee.name, age: employee.age },
  };
};
