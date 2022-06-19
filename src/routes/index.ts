import express from 'express';
import swaggerUI from 'swagger-ui-express';

import employees from './employees';
import companies from './companies';
import swaggerDocs from '../swagger/docs';

const router = express.Router();

router.use('/', employees);
router.use('/', companies);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default router;
