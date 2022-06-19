import express from 'express';

import { controllerWrapper } from '../controllers/helpers';
import { getCompany } from '../controllers/companies/getOne';
import { createCompany } from '../controllers/companies/post';
import { getCompanies } from '../controllers/companies/getAll';
import { updateCompany } from '../controllers/companies/update';
import { deleteCompany } from '../controllers/companies/delete';

const router = express.Router();

router.get('/companies', controllerWrapper(getCompanies));
router.post('/companies', controllerWrapper(createCompany));
router.get('/companies/:id', controllerWrapper(getCompany));
router.patch('/companies/:id', controllerWrapper(updateCompany));
router.delete('/companies/:id', controllerWrapper(deleteCompany));

export default router;
