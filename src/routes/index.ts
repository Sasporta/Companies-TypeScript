import express from 'express';
import swaggerUI from 'swagger-ui-express';

import employees from './employees';
import companies from './companies';
import swaggerDocs from '../swagger/docs';

import employeesB from './employeesB';
import companiesB from './companiesB';

const router = express.Router();

router.use('/', employees);
router.use('/', companies);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// NOTE: implemented without query builder for comparison
router.use('/', employeesB);
router.use('/', companiesB);

export default router;
