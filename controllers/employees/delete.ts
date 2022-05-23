import { Request, Response } from 'express';

import { findOrThrow } from '../helpers';
import { Employee } from '../../entities/Employee';

export const deleteEmployee = async ({ params: { id: uuid } }: Request, res: Response) => {
  try {
    const employee = await findOrThrow(Employee, uuid, 404);

    employee.remove()

    return res.status(204).json();
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
