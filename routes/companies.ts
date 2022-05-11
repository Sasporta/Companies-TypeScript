import express from 'express';

import { createCompany } from '../controllers/companies/post';
import { getCompanies } from '../controllers/companies/getAll';

const router = express.Router()

router.get('/companies', getCompanies);
router.post('/companies', createCompany);

export default router;
