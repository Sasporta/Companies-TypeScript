import express from 'express';
import { getEmployeeMetadata } from '../controllers/employeesMetadata/getOne';
import { getEmployeesMetadata } from '../controllers/employeesMetadata/getAll';

const router = express.Router();

router.get('/employeesMetadata', getEmployeesMetadata);
router.get('/employeesMetadata/:id', getEmployeeMetadata);

export default router;
