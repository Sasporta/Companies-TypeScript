import express from 'express';

import { getEmployee } from '../controllers/employees/getOne';
import { createEmployee } from '../controllers/employees/post';
import { getEmployees } from '../controllers/employees/getAll';
import { employeesVal } from '../middleware/requestValidation';
import { updateEmployee } from '../controllers/employees/update';
import { deleteEmployee } from '../controllers/employees/delete';
import { getCousins } from '../controllers/employees/getAllCousins';

const router = express.Router();

router.get('/employees', employeesVal.getAll, getEmployees);
router.post('/employees', employeesVal.post, createEmployee);
router.get('/employees/:id', employeesVal.getOne, getEmployee);
router.patch('/employees/:id', employeesVal.patch, updateEmployee);
router.delete('/employees/:id', employeesVal.delete, deleteEmployee);
router.get('/employees/cousins/:id', employeesVal.getCousins, getCousins);

export default router;
