import express from 'express';

import { controllerWrapper } from '../controllersB/helpers';
import { getEmployeeB } from '../controllersB/employees/getOne';
import { createEmployeeB } from '../controllersB/employees/post';
import { getEmployeesB } from '../controllersB/employees/getAll';
import { updateEmployeeB } from '../controllersB/employees/update';
import { deleteEmployeeB } from '../controllersB/employees/delete';
import { getCousinsB } from '../controllersB/employees/getAllCousins';

const router = express.Router();

router.get('/employeesb', controllerWrapper(getEmployeesB));
router.post('/employeesb', controllerWrapper(createEmployeeB));
router.get('/employeesb/:id', controllerWrapper(getEmployeeB));
router.patch('/employeesb/:id', controllerWrapper(updateEmployeeB));
router.delete('/employeesb/:id', controllerWrapper(deleteEmployeeB));
router.get('/employeesb/cousins/:id', controllerWrapper(getCousinsB));

export default router;
