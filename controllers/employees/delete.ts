import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { Employee } from '../../entities/Employee';

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id: uuid } = req.params;

  try {
    const employee = await Employee.findOneBy({ uuid });

    if (!employee) { return errorHandler(res, 404); }

    employee.remove();

    return res.status(204).json();
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
