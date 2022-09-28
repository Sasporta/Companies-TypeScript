import express from 'express';

import { getCompany } from '../controllers/companies/getOne';
import { createCompany } from '../controllers/companies/post';
import { companiesVal } from '../middleware/requestValidation';
import { getCompanies } from '../controllers/companies/getAll';
import { updateCompany } from '../controllers/companies/update';
import { deleteCompany } from '../controllers/companies/delete';

const router = express.Router();

router.get('/companies', companiesVal.getAll, getCompanies);
router.post('/companies', companiesVal.post, createCompany);
router.get('/companies/:id', companiesVal.getOne, getCompany);
router.patch('/companies/:id', companiesVal.patch, updateCompany);
router.delete('/companies/:id', companiesVal.delete, deleteCompany);

export default router;
