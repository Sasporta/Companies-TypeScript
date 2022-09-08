import express from 'express';

import EmployeeModel from '../models/Employee';

const [
  createEmployee,
  deleteEmployee,
  getCousins,
  getEmployee,
  getEmployees,
  updateEmployee,
] = EmployeeModel.employeesEps();

const router = express.Router();

router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.get('/employees/:id', getEmployee);
router.patch('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);
router.get('/employees/cousins/:id', getCousins);

export default router;
