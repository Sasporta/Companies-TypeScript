import express from 'express';

import EmployeeMetadataModule from '../modules/employeeMetadata';

const [getEmployeeMetadata, getEmployeesMetadata] =
  EmployeeMetadataModule.employeesMetadataEps();

const router = express.Router();

router.get('/employeesMetadata', getEmployeesMetadata);
router.get('/employeesMetadata/:id', getEmployeeMetadata);

export default router;
