import express from 'express';
import swaggerUI from 'swagger-ui-express';

import companies from './companies';
import employees from './employees';
import healthCheck from './healthCheck';
import employeesMetadata from './employeeMetadata';

import swaggerDocs from '../swagger/docs';

const router = express.Router();

router.use(healthCheck, companies, employees, employeesMetadata);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default router;
