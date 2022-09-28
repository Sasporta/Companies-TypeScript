import express from 'express';

import { employeeMetadataVal } from '../middleware/requestValidation';
import { getEmployeeMetadata } from '../controllers/employeesMetadata/getOne';
import { getEmployeesMetadata } from '../controllers/employeesMetadata/getAll';

const router = express.Router();

router.get(
  '/employeesMetadata',
  employeeMetadataVal.getAll,
  getEmployeesMetadata,
);

router.get(
  '/employeesMetadata/:id',
  employeeMetadataVal.getOne,
  getEmployeeMetadata,
);

export default router;
