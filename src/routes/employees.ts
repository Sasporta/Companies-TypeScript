import express from 'express';

import { controllerWrapper } from '../controllers/helpers';
import { getEmployee } from '../controllers/employees/getOne';
import { createEmployee } from '../controllers/employees/post';
import { getEmployees } from '../controllers/employees/getAll';
import { updateEmployee } from '../controllers/employees/update';
import { deleteEmployee } from '../controllers/employees/delete';

const router = express.Router();

router.get('/employees', controllerWrapper(getEmployees));
router.post('/employees', controllerWrapper(createEmployee));
router.get('/employees/:id', controllerWrapper(getEmployee));
router.patch('/employees/:id', controllerWrapper(updateEmployee));
router.delete('/employees/:id', controllerWrapper(deleteEmployee));

export default router;
