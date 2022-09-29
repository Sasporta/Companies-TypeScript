import { validationResult } from 'express-validator';

import { RouteHandler } from '../../types/global';
import { EmployeeMetadataDataManager } from '../../services/Data/Mongo';

export const getEmployeesMetadata: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      query: { companyUuid, limit },
    } = req;

    const whereStatement = companyUuid
      ? { companyUuid: companyUuid as string }
      : {};

    const employees = await EmployeeMetadataDataManager.getAll(
      whereStatement,
      limit as unknown as number,
    );

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
