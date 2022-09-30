import { validationResult } from 'express-validator';

import { RouteHandler } from '../../../../types/global';
import { EmployeeMetadataMongo } from '../../../../services/Mongo';

export const getEmployeeMetadata: RouteHandler = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const {
      params: { id: uuid },
    } = req;

    const employeeMetadata = await EmployeeMetadataMongo.getOne(uuid);

    if (!employeeMetadata) {
      throw { status: 404, entity: 'employeeMetadata', uuid };
    }

    return res.status(200).json(employeeMetadata);
  } catch (error) {
    next(error);
  }
};
