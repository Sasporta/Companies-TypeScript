import { Request } from 'express';

import { findOrThrow } from '../helpers';
import { Employee } from '../../entities/Employee';

export const deleteEmployee = async ({ params: { id: uuid } }: Request) => {
    const employee = await findOrThrow(Employee, uuid, 404);

    employee.remove()

  return { statusCode: 204 };
};
