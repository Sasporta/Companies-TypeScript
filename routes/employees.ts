import express from 'express';

import { getEmployee } from '../controllers/employees/getOne';
import { createEmployee } from '../controllers/employees/post';
import { getEmployees } from '../controllers/employees/getAll';
import { deleteEmployee } from '../controllers/employees/delete';


const router = express.Router();

router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.get('/employees/:id', getEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
