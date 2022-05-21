import { Request, Response } from 'express';

import { errorHandler } from '../helpers';
import { Employee } from '../../entities/Employee';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json(Employee.arrayToJson(employees));
  }
  catch (error) { return errorHandler(res, 500, error.message); }
};
