import express from 'express';

import CompanyModel from '../models/Company';

const [createCompany, deleteCompany, getCompany, getCompanies, updateCompany] =
	CompanyModel.companiesEps();

const router = express.Router();

router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.get('/companies/:id', getCompany);
router.patch('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

export default router;
