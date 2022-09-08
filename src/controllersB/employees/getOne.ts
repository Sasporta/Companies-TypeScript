import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { Employee } from '../../entities/Employee';

export const getEmployeeB = async ({ params: { id: uuid } }: Request) => {
  const employee = await findOrThrow(Employee, uuid, 404);

  return {
    statusCode: 200,
    content: { uuid: employee.uuid, name: employee.name, age: employee.age },
  };
};
