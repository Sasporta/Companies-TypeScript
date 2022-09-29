import { validationResult } from 'express-validator';

import { RouteHandler } from '../../types/global';
import { EmployeeMetadataDataManager } from '../../services/Data/Mongo';

export const getEmployeeMetadata: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    const employeeMetadata = await EmployeeMetadataDataManager.getOne(uuid);

    if (!employeeMetadata) {
      throw { status: 404, entity: 'employeeMetadata', uuid };
    }

    return res.status(200).json(employeeMetadata);
  } catch (error) {
    next(error);
  }
};
