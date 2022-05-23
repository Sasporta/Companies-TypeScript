import { Request, Response } from 'express';

import { findOrThrow } from '../helpers';
import { format } from '../jsons/employees';
import { Employee } from '../../entities/Employee';

export const getEmployee = async({ params: { id: uuid } }: Request, res: Response) => {
  try {
    const employee = await findOrThrow(Employee, uuid, 404);

    return res.status(200).json(format(employee));
  }
  catch (error) { return res.status(error.status ?? 500).json(error.message); }
};
