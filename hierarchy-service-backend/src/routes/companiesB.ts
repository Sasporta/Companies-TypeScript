import express from 'express';

import { controllerWrapper } from '../controllersB/helpers';
import { getCompanyB } from '../controllersB/companies/getOne';
import { createCompanyB } from '../controllersB/companies/post';
import { getCompaniesB } from '../controllersB/companies/getAll';
import { updateCompanyB } from '../controllersB/companies/update';
import { deleteCompanyB } from '../controllersB/companies/delete';

const router = express.Router();

router.get('/companiesb', controllerWrapper(getCompaniesB));
router.post('/companiesb', controllerWrapper(createCompanyB));
router.get('/companiesb/:id', controllerWrapper(getCompanyB));
router.patch('/companiesb/:id', controllerWrapper(updateCompanyB));
router.delete('/companiesb/:id', controllerWrapper(deleteCompanyB));

export default router;
