import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { format } from '../jsons/employees';
import { Employee } from '../../entities/Employee';

export const getEmployee = async({ params: { id: uuid } }: Request) => {
  const employee = await findOrThrow(Employee, uuid, 404);

  return { statusCode: 200, content: format(employee) };
};
