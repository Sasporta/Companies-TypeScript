import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocs from './swagger/docs';

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default app;
