import express from 'express';

import { getCompany } from '../controllers/companies/getOne';
import { createCompany } from '../controllers/companies/post';
import { getCompanies } from '../controllers/companies/getAll';
import { updateCompany } from '../controllers/companies/update';
import { deleteCompany } from '../controllers/companies/delete';

const router = express.Router()

router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.get('/companies/:id', getCompany);
router.patch('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

export default router;
