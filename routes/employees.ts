import express from 'express';

import { createEmployee } from '../controllers/employees/post';
import { getEmployees } from '../controllers/employees/getAll';

const router = express.Router();

router.get('/employees', getEmployees);
router.post('/employees', createEmployee);

export default router;
