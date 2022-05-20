import express from 'express';

import { createEmployee } from '../controllers/employees/post';

const router = express.Router();

router.post('/employees', createEmployee);

export default router;
