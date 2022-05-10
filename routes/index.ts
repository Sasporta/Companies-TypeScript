import express from 'express';

import employees from './employees'
import companies from './companies'

const router = express.Router();

router.use('/', employees);
router.use('/', companies);

export default router;
