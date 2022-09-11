import express from 'express';

import CompanyModule from '../modules/Company';

const [createCompany, deleteCompany, getCompany, getCompanies, updateCompany] =
  CompanyModule.companiesEps();

const router = express.Router();

router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.get('/companies/:id', getCompany);
router.patch('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

export default router;
