import express from 'express';

import { createCompany } from '../controllers/companies/post';

const router = express.Router()

router.post('/companies', createCompany);

export default router;
