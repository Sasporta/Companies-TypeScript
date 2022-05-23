import express from 'express';

import { getCompany } from '../controllers/companies/getOne';
import { createCompany } from '../controllers/companies/post';
import { getCompanies } from '../controllers/companies/getAll';

const router = express.Router()

router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.get('/companies/:id', getCompany);

export default router;
